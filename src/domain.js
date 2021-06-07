let status, domain;

status = 'dev';

status === "dev" 
?domain = 'http://localhost:5000'
:domain = 'https://mysql-deploy-firsttest.herokuapp.com'

export default domain