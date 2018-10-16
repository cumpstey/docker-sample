export const toParamCase = string => string.replace(/([A-Z])/g, (m, w) => `-${w.toLowerCase()}`);

const columnTableItems = {
  id: 'id',
  name: 'name',
  status: 'status',
  green: 'communications',
  red: 'communications',
  amber: 'communications',
  last_login: 'lastLogin',
  actions: 'actions',
  first_name: 'firstName',
  last_name: 'lastName',
  username: 'username',
  email: 'email',
  active: 'active',
  role_id: 'role',
  level: 'severity',
  brand: 'brand',
  unsubscribed_date: 'unsubscribedDate',
  dms_customer_id: 'dmsid',
  ivs_order_id: 'ivsid',
  code: 'code',
  information_message: 'message',
  dms_value: 'dms',
  ivs_value: 'ivs',
  order_date: 'orderDate',
  model: 'model',
  order_type: 'type',
  communication: 'comms',
  sent: 'sentDate',
};

export const findColumnItem = (tableItem) => {
  if (columnTableItems[tableItem]) {
    return columnTableItems[tableItem];
  } return tableItem;
};
