# Orchestra Playbook, Protoype I
> *Level of Complexity:* Manual Configuration

## On your local machine:

### I. Create a local Ubuntu Virtual Machine (VM).
#### 1. Set up Vagrant to create a Linux development environment.

* [Vagrant Installation Documentation](https://www.vagrantup.com/docs/installation/)
* [Vagrant CLI](https://www.vagrantup.com/docs/cli/) 

#### 2. Add the [_Ubuntu 14.04_]((https://app.vagrantup.com/ubuntu/boxes/trusty64) ) box to Vagrant:
* `vagrant box add ubuntu/trusty64`

#### 3. Create a directory as workspace for this project. 
 
#### 4. Inside this directory, initialize, start, and access your VM.
  * Initialize your VM: 
    *  `vagrant init ubuntu/trusty64`
  * Start your VM:
    *  `vagrant up`
  * Access your VM:
    *  `vagrant ssh`

## Inside the VM:

### II. Install Node.js and dependencies.
> This will be the basis for `bootstrap.sh`. We need Node.js and some other things to create Orchestra.

#### 1. Use `node` to check if Node.js is installed:
* It is not installed on this VM.

#### 2. Check for Ubuntu package updates.
* `sudo apt-get update`
  
#### 2.  Install [Node.js](https://nodejs.org/en/) the Ubuntu package manager:
* `sudo apt-get -y install nodejs`
  
#### 3. Install [npm](https://docs.npmjs.com/), the package manager for Node.js with the Ubuntu package manager:
* `sudo apt-get -y install npm` 

#### 4. Install the [lodash](https://www.npmjs.com/package/lodash) javascript library with npm:
* `npm i --save lodash`

### III. Set up a PHP Server 

#### 1. Install the Apache2 Server
* `sudo apt-get -y install apache2`
* Check the server is up with `curl http://127.0.0.1`
* Curl returns the regular ubuntu default page.

#### 2. Install PHP and its dependencies
* `sudo apt-get -y install php5 libapache2-mod-php5 php5-mcrypt`

#### Add the servername to the apache2.conf file.

* Add this line to the bottom of the file: `ServerName localhost`

##### 3. Tell Apache2 to follow the PHP index file by changing /etc/apache/modes-enabled/dif.conf.
* `sudo vi /etc/apache2/mods-enabled/dir.conf`
* Move index.php to the first in this file, such that the file looks like this: 
```
<IfModule mod_dir.c>
    DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
</IfModule>
```
4. Restart the service.
* `sudo service apache2 restart`





