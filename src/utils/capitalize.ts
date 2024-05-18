const capitalize = (str?: string) => {
	if (!str) {
		return undefined;
	}
	return str[0].toUpperCase() + str.substring(1);
};

export default capitalize;
