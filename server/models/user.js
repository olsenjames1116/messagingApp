const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, required: true, maxLength: 100 },
	password: { type: String, required: true, maxLength: 100 },
	profilePic: {
		type: Schema.Types.ObjectId,
		ref: 'Image',
		required: true,
		default:
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB6klEQVR4nO2XzUoDMRSFU30ERR9BX8GN4EJXmS7E+gNqIoLPoJg4O8Hcgq6tomv3zlQ3ggo+goWuFdxYRTf+4JVMa1Wk2JlpmxRy4EBgMu13cu+EhBAnJyenn8KATmBI9zCgJQy856qjcUE/I7YKi3QYQ3qJoYf/+ELPJTYJi9kxDOhDE/BV67nF7BixZuXjwNdNK1ZUosm2aRTiCpFkDH+wSeHr7TRhLkBI99MH8ArmAujtMX0FSiYDPLUgwFN3Bwi9R5MBuryFQrqXvgJ011yAbt9GtTDwzlJsoefEkkNcJUHrVDDMDpGuPMxF5yBLDnO/K+FdNNM21qx8ww87urx4198Xmmhs94XGySmFFlY3+7iASS5gmwlVZEKVuYR7JtWrdjQWqqyf6Tl6rn6HmFQud9S7JGCKSThmAt64BIxj/Q6TcKx/w/f9ng6iY4ZvbM3UVjkWdOMwqrwoYLrt6MtrO4NMqNNWgfO/Ppn3YaAt8IvrMMoE3LQRHiMLdcdlfryl8EzAbJI+T95S8Kb/syXwSxv5OS7Ve6fged3qPXWIBalGuICXzsNDtRJSverWTQS/4uf7uVS3puD5dyVuNUvsAEyoQ/Pw8OWD2AG4VB8WgGOtCh8JApiGhl92AbirALgWcnJyciLW6RPglref6aHf7QAAAABJRU5ErkJggg==',
	},
	bio: { type: String, required: true },
});
