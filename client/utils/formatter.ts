export function formDataConverter<T>(formData: FormData): T {
  const obj: any = {};

  formData.forEach((val, key) => {

    if (key === 'phone') {
      obj[key] = +val;
    } else {
      obj[key] = val;
    }
  });

  return obj as T;
};

