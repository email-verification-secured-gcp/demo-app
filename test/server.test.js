const axios = require('axios');

const  baseURL = 'http://localhost:3000';

const client = axios.create({
    baseURL,
    validateStatus: () => true, 
  });


  describe('/v1/user post,get,put',  () => {

    it('create account and verify', async () => {

        const token = Buffer.from(`shoba123@gmail.com:abc1`, 'utf8').toString('base64')
        const response = await client.post('/v1/user', {
            "first_name": "Jane",
            "last_name": "Doe",
            "password": "abc1",
            "username": "shoba123@gmail.com"
          });
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('username');
        userId = response.data.userId;        
        const res = await client.get('/v1/user/self',{
            headers:{
                'Authorization': `Basic ${token}`
            }
        });
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('username');
      });

     it(' update account and validate', async () => {
        const token = Buffer.from(`shoba123@gmail.com:abc1`, 'utf8').toString('base64')
        const response = await client.put('/v1/user/self', {
            "first_name": "Jack",
            "last_name": "Sparrow",
            "password": "abc1",
          },{
            headers:{
                'Authorization': `Basic ${token}`
            }
        });
        expect(response.status).toBe(204);
        userId = response.data.userId;        
        const res = await client.get('/v1/user/self',{
            headers:{
                'Authorization': `Basic ${token}`
            }
        });
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('first_name', 'Jack');
        expect(res.data).toHaveProperty('last_name', 'Sparrow');
      });
  })