export const environment = {
  production: true,
  regex: {
	username: /^[a-zA-Z]{6,20}$/,
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}/
  },
  tooltip: {
  	username: "Only letters are allowed. Min 6 and Max 20.",
  	password: "Should contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character. Min 6 and Max 20"
  }
};
