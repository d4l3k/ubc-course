require 'bundler'
Bundler.require

DataMapper.setup(:default, 'postgres://postgres:@localhost/ubcourses')
class Course
  include DataMapper::Resource

  property :id,         String, key: true
  property :name,      Text
  property :description,       Text
  has n, :reviews
  belongs_to :department
end
class Review
  include DataMapper::Resource

  property :id,         Serial
  property :field,     Text
  property :professor, Text
  property :like,      Boolean
  property :useful,      Boolean
  property :easy,      Boolean
  property :text,       Text
  belongs_to :course
  belongs_to :professor
end
class Department
  include DataMapper::Resource
  property :id, String, key: true
  property :description, Text

  has n, :professors, through: Resource
  has n, :courses
end
class Professor
  include DataMapper::Resource
  property :name, String, key: true
  property :phone, String
  property :email, String
  property :id, String

  has n, :reviews
  has n, :departments, through: Resource
end
DataMapper.auto_upgrade!
DataMapper.finalize

task :default do
end

task :pry do
  binding.pry
end

$c = Curl::Easy.new

def open url
  $c.url = url
  $c.perform
  $c.body_str
end

task :scrape_courses do
  html = Nokogiri::HTML(open('https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=0'))
  departments = html.css("#mainTable td:nth-child(1)").map{|a|a.text.strip}
  department_details = html.css("#mainTable td:nth-child(2)").map{|a|a.text.strip}
  len = departments.length
  departments.each_with_index do |dept, i|
    dept_obj = Department.first_or_create(id: dept, description: department_details[i])
    if Course.all(department: dept).length == 0 && !dept.include?("*")
      puts "Scraping: #{dept} (#{i}/#{len})"
      dept_html = Nokogiri::HTML(open("https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=1&dept=#{dept}"))
      dept_courses = dept_html.css("#mainTable td:nth-child(1)").map{|a|a.text.strip}
      dept_courses_names = dept_html.css("#mainTable td:nth-child(2)").map{|a|a.text.strip}
      dept_courses.each_with_index do |course, j|
        puts ":: #{course}"
        id = course.split(" ").last
        course_html = Nokogiri::HTML(open("https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=3&dept=#{dept}&course=#{id}"))
        course_id = course.gsub(' ', '')
        course_name = dept_courses_names[j]
        description = course_html.css("p").first.text.strip
        c = Course.first_or_create(id: course_id, department: dept_obj, name: course_name, description: description)
        binding.pry unless c.saved?
      end
    end
  end
end

def x; Process.exit; end

task :scrape_profs do
  easy_options = {:follow_location => true, :multipart_form_post => true}
  multi_options = {:pipeline => true}
  url_fields = Department.all.map do |dept|
    {
      url: 'https://courses.students.ubc.ca/cs/main',
      post_fields: {
        instSearchName: '',
        instSearchSubj: dept.id,
        submit: 'Search for Instructors',
        pname: 'instsearch',
        tname: 'instsearch'
      }
    }
  end
  Curl::Multi.post(url_fields, easy_options, multi_options) do |easy|
    html = Nokogiri::HTML(easy.body_str)
    dept_name = html.css('#instSearchSubj').first.attr('value')
    puts "Processing: #{dept_name}..."
    subjects = html.css("#mainTable td:nth-child(2)").map(&:text).map(&:strip)
    html.css("#mainTable td:nth-child(1) a").each_with_index do |a, i|
      begin
        url = a.attr('href')
        name = a.text
        subject = subjects[i].split(/, */)
        prof_id = url.match(/ubcid=(?<id>\d+)&/)['id']
        prof = Professor.first_or_create(name: name, id: prof_id)
        subject.each do |sub|
          prof.departments << Department.first_or_create(id: sub)
        end
        prof.save
      rescue Exception => e
      end
    end
  end
end
task :scrape_profs_detail do
  easy_options = {:follow_location => true, :multipart_form_post => true}
  multi_options = {:pipeline => true}
  url_fields = Professor.all.map do |prof|
    "https://courses.students.ubc.ca/cs/main?pname=inst&ubcid=#{prof.id}"
  end
  Curl::Multi.get(url_fields, easy_options, multi_options) do |easy|
    html = Nokogiri::HTML(easy.body_str)
    prof = Professor.all(id: easy.last_effective_url.match(/\d+$/)).first
    puts "Processing: #{prof.name}"
    tds = html.css(".table-nonfluid td:nth-child(2)")
    prof.update(phone: tds[1].text.strip,
               email: tds[2].text.strip)
  end
end

task :beautify do
  system("fixjsstyle {server,client/app}/**/*.js")
end
