# Orchestra Playbook, Protoype I
> *Level of Complexity:* Manual Configuration

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

### II. Install Node and Node Dependencies
> This will be the basis for `bootstrap.sh`

### III. Set up a PHP Server

