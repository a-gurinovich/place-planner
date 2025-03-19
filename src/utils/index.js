
export const downloadURI = (content, name) => {
    var a = document.createElement('a');
    a.download = name;

    var file = new Blob([content], {type: 'application/json'});
    a.href = URL.createObjectURL(file);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }