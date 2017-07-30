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


#### 3. Create a symlink for Node.js:
* `sudo ln -s /usr/bin/nodejs /usr/bin/node`
  
#### 4. Install [npm](https://docs.npmjs.com/), the package manager for Node.js with the Ubuntu package manager:
* `sudo apt-get -y install npm` 

#### 5. Install the [lodash](https://www.npmjs.com/package/lodash) javascript library with npm:
* `npm i --save lodash`

### III. Set up a PHP Application 

#### 1. Install the software we need
* `sudo apt-get -y install apache2 libapache2-mod-php5`
* Check the server is up with `curl http://127.0.0.1`
* Curl returns the regular ubuntu default page.

#### 2. Install PHP 
* `sudo apt-get -y install php5`

### IV. Insert our PHP App in the root directory of our web server.
#### 1. Remove default apache homepage
* `sudo rm /var/www/html/index.html`

#### 2. Insert our index.php into the root directory
* `sudo vi /var/www/html/index.php`
* Insert the content we need:

   ```
   <?php
   header("Content-Type: text/plain");
   echo "Hello, world!\n"; 
   ?>
   ```

#### 3. Restart the apache2 server
* `sudo service restart apaches2`


### V. Check everything is working in our VM
#### 1. Check with curl for a 200 respone and the string "Hello, World!"
* `curl -sv "http://ADDRESS"`



