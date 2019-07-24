#! /bin/bash

# install Node
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

# install the listing service app
sudo adduser --disabled-password --gecos "" listing

mkdir /home/listing/src
cd /home/listing/src
git clone https://github.com/norhe/listing-service.git
cd listing-service
npm install

# systemd
cat <<EOF | sudo tee /lib/systemd/system/listing.service
[Unit]
Description=server.js - Listing service API
Documentation=https://example.com
After=network.target

[Service]
Type=simple
User=listing
ExecStart=/usr/local/bin/envconsul -prefix listing_conf /usr/bin/node /home/listing/src/listing-service/server.js
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable listing.service
sudo systemctl start listing.service