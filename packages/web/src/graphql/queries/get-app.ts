import { gql } from '@apollo/client';

export const GET_APP = gql`
  query GetApp($key: String!) {
    getApp(key: $key) {
      name
      key
      iconUrl
      docUrl
      authDocUrl
      primaryColor
      supportsConnections
      dynamicData {
        name
        key
      }
      auth {
        fields {
          key
          label
          type
          required
          readOnly
          value
          description
          docUrl
          clickToCopy
          options {
            label
            value
          }
        }
        authenticationSteps {
          type
          name
          arguments {
            name
            value
            type
            properties {
              name
              value
            }
          }
        }
        sharedAuthenticationSteps {
          type
          name
          arguments {
            name
            value
            type
            properties {
              name
              value
            }
          }
        }
        reconnectionSteps {
          type
          name
          arguments {
            name
            value
            type
            properties {
              name
              value
            }
          }
        }
        sharedReconnectionSteps {
          type
          name
          arguments {
            name
            value
            type
            properties {
              name
              value
            }
          }
        }
      }
      connections {
        id
      }
      triggers {
        name
        key
        type
        showWebhookUrl
        pollInterval
        description
        substeps {
          name
        }
        arguments {
          key
          label
          type
          required
          readOnly
          value
          placeholder
          description
          docUrl
          clickToCopy
          variables
        }
      }
      actions {
        name
        key
        description
        substeps {
          name
        }
        arguments {
          key
          label
          type
          required
          readOnly
          value
          placeholder
          description
          docUrl
          clickToCopy
          variables
        }
      }
    }
  }
`;
