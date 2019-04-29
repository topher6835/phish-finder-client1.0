import axios from 'axios';

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_API_URL : '/api';

export default axios.create({
    baseURL: apiUrl
});

// prod url 4/26/19
// http://phishfinderservice-env.3uquabg3mf.us-east-2.elasticbeanstalk.com/api/