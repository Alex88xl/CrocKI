The SmartContract-folder contains several folders and files to build
a succesfull smartcontract which then can be migrated to a blockchain.
The build-folder contains the compiled smartContracts as a json-file.
These files need to be exported to the Frontend whcih will then use 
the contained data to connect to the blockhain and aswell to interact
with the smartcontract.
The contract-folder includes the smartContracts as a solidity-file.
The migrations-folder is used to bring the smartContracts into relation
to the blockchain and to compile the smartContracts to the json-file.
The test-folder includes testfiles to validate the smartContracts.
The bs-config.js configures the savefolder for the migration-files.
The package.json includes necessary information and configurations,
such as the authors, the license, needed dependencies for development
and production and scripts to automate the deploymentprocess.
The truffle-config.js configures the endpoint of the blockchain (localhost)