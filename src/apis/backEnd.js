import axios from 'axios';

const apiUrl = process.env.NODE_ENV === 'production' ? 'http://134.209.168.101:5000/api/' : '/api';

export default axios.create({
    baseURL: apiUrl,
    timeout: 7000
});

// prod url 4/26/19 (aws)
// http://phishfinderservice-env.3uquabg3mf.us-east-2.elasticbeanstalk.com/api/

// prod url 5/29/20 (digitalocean)
// *AWS free expired
// http://134.209.168.101:5000/api/