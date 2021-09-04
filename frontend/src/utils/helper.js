/*eslint-disable*/
import moment from 'moment';

export const formatDate = (timestamp) => {
  return moment(timestamp).format('h:mm:ss A');
};
