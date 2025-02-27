import config from 'config/app';

interface IntegrationData {
    name: string;
    Key: string;
    SupportsConnections: boolean;
    BaseUrl: string;
    apiBaseUrl: string;
    logo?: File | null;
  }
  
  async function newIntegration(integrationData: IntegrationData, authorization_header: string) {
    try {
      const formData = new FormData();

      formData.append('name', integrationData.name);
      formData.append('key', integrationData.Key);
      formData.append('supportsConnections', integrationData.SupportsConnections.toString());
      formData.append('baseUrl', integrationData.BaseUrl);
      formData.append('apiBaseUrl', integrationData.apiBaseUrl);
  
      if (integrationData.logo) {
        formData.append('logo', integrationData.logo);
      }
  
      const response = await fetch(`${config.apiUrl}/integrations/create`, {
        method: 'POST',
        headers: {
          'Authorization' : `Bearer ${authorization_header}`,
        },
        body: formData as unknown as BodyInit,
      });
  
      if (response.ok) {
        console.log('Integration data sent successfully!');
        const data = await response.json();
        return { success: true, message: 'Successful', key: data.key};
      } else {
        console.error('Failed to send integration data to the backend.');
        return { success: false, message: 'Failed to send integration data to the backend' };
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return { success: false, message: 'An error occurred' };
    }
  }
  
  export default newIntegration;
  