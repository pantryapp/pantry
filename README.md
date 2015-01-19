## Installation

run [sudo] `npm install`
run `bower install`

## Development
App data are fetch via an api. Api must be started locally on port <3000>. Go in `cd pantry-api` and follow instructions there to start the api.
Api endpoint is set via <ENV constant> var which is via ngconstant tasks in Gruntfile.

run `grunt serve` to start a local server on port <9000>. Running grunt serve will set <ENV constant> to <development>.

## Build

run `grunt build`. Running grunt build will set <ENV constant> to <production> and build a <dist> folder.
