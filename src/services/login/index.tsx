import ApiService from 'services/apiService';

class LoginServices extends ApiService {
  handleLogin = (data: { signature: string; address: string }) => {
    return this.post('auth/login', data);
  };
}

const loginServices = new LoginServices();

export default loginServices;
