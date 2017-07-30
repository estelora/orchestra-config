# Orchestra Playbook, Protoype II
> *Level of Complexity:* Shell Scripts

## Inside the VM

#### 1. Copy the files from the  shell directory into the home directory of your VM.

#### 2. Give these files executable permissions
* `sudo chmod 755 boostrap.sh install.sh configure.sh restart.sh`

#### 3. Get your shell on! :shell:
* Execute bootstrap.sh
  * `sudo ./bootstrap.sh`
* Execute install.sh
  * `sudo ./install.sh`
 * Execute remove.sh
  * `sudo ./restart.sh`
* Execute configure.sh
  * `sudo ./configure.sh` 
* Execute restart.sh
  * `sudo./restart.sh`
#### Check that our PHP app is working on the webserver with curl
* `curl -sv "http://ADDRESS"`
