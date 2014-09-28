require 'bundler'
Bundler.require

set :application, "UBCourses"
set :domain, "raven.fn.lc"
set :deploy_to, "/srv/http/ubc-courses"
set :repository, 'https://github.com/d4l3k/ubc-courses.git'


task :deploy do
  deploy do
    invoke :'git:clone'
    invoke :'npm:install'
    invoke :'bundle'
    invoke :'grunt:install'
    invoke :'grunt:build'
  end
end
