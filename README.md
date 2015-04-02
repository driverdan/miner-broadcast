# miner-broadcast

Miner-broadcast is a simple client that takes cgminer / sgminer stats and broadcasts them every five seconds to a miner-stat-server instance.

## Config

Miner-broadcast uses enviroment vars for config.

* MINER_HOST: URL of host server. Default is 'http://localhost:3000'.
* MINER_NAME: Name of this miner instance. Each miner should have its own
  name. Default is 'miner'.

## Running

It is strongly recommended to run miner-broadcast using a daemon / process manager tool such as
[PM2](https://github.com/Unitech/pm2). This will ensure that when (not if) it
has socket.io connection issues and crashes that it will be restarted.

## Known Issues

Socket.io may have connectivity issues resulting in many reconnection
attempts and/or crashing.
