#!/bin/bash

# remove index.html
sudo rm /var/www/html/index.html

# write index.php with a heredoc
sudo cat << EOF > /var/www/html/index.php
<?php
header("Content-Type: text/plain");
echo "Hello, world!\n";
?>
EOF


