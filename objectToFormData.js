const values = {
	photos: [
		new File(["mountains"], "mountains.jpg"),
		new File(["building"], "building.jpg"),
	],
	brokerfee: "55",
	address: "12 York Street",
	hasCollateral: true,
	creditScore: "",
	collaterals: [
		{
			address: "33 Bay Street",
			mortgagePosition: "2",
			mortgages: [
				{
					lenderId: "1",
					balance: "5000",
					loan: {
						request: "123",
						paid: "3",
					},
				},
			],
		},
		{
			address: "78 Lisgar Street",
			mortgagePosition: "5",
			mortgages: [
				{
					lenderId: "5",
					balance: "6000",
					loan: {
						request: "1234",
						paid: "4",
					},
				},
				{
					lenderId: "3",
					balance: "1000",
					loan: {
						request: "12345",
						paid: "5",
					},
				},
			],
		},
	],
};

// Recursive function to flatten nested form values object for FormData
function objectToFormData(obj, formData, name) {
  let fd = formData || new FormData();
  let keyName;

  for (let objKey in obj) {
    keyName = name ? `${name}[${objKey}]` : objKey;
    if (obj[objKey] instanceof File) {
      fd.append(keyName, obj[objKey]);
    } else if (
      Array.isArray(obj[`${objKey}`]) &&
      !obj[objKey] instanceof File
    ) {
      const arr = obj[`${objKey}`];
      arr.forEach((obj, index) => {
        let tempKeyName = `${keyName}[${index}]`;
        objectToFormData(obj, fd, tempKeyName);
      });
    } else if (typeof obj[objKey] === "object") {
      objectToFormData(obj[objKey], fd, keyName);
    } else {
      if (!obj[objKey]) {
        fd.append(keyName, "");
      } else {
        fd.append(keyName, obj[objKey]);
      }
    }
  }
  return fd;
}

const serializedFd = objectToFormData(values);

for (let val of serializedFd) {
	console.log(val[0] + ", " + val[1]);
}
