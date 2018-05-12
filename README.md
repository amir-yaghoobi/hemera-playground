# hemera-playground
A simple [hemera](https://github.com/hemerajs/hemera) project to test how communication works.

## Install
First we need to install and run [NAT server](https://nats.io/download/nats-io/gnatsd/).\
then run `npm install`

## Usage
First run:
```bash
node index.js
```
then you can read the secret value with:
```bash
node worker.js READ
```
also you can change the secret value with:
```bash
node worker.js WRITE yourValue
```

### Subscribe
for subscribe to secret value change event you can run:
```bash
node subscribe.js
```
