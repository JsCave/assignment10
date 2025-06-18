var recordName=document.getElementById('name')
var site=document.getElementById('site')
var records=document.getElementById('records')
var warnBox=document.getElementById('warnBox')

var list=[]
if(localStorage.getItem("sitesList") !==null){
    list=JSON.parse(localStorage.getItem("sitesList"))
    handleDisplay()
}

function handleDisplay(){
    var temp=""
    for(var i=0;i<list.length;i++){
        temp+=`<tr><td>`+list[i].id+`</td><td>`+list[i].name+`</td><td><button class="btn btn-success" onclick="handleUrl(`+i+`)"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td><td><button class="btn btn-danger" onclick="handleDelete(`+i+`)"><i class="fa-solid fa-trash-can"></i> Delete</button></td></tr>`
    }
    records.innerHTML=temp
}

function handleAdd(){

        const pattern = new RegExp(
          '^([a-zA-Z]+:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', // fragment locator
          'i'
        );
        var isValidUrl=pattern.test(site.value.trim());
      if(isValidUrl && recordName.value!==""){
        var newSite={
            id:list.length+1,
            name:recordName.value,
            site:site.value
        }
        list.push(newSite)
        localStorage.setItem('sitesList',JSON.stringify(list))
        handleDisplay()
      }else{
warnBox.style.display="block"
      }
}
    

function handleDelete(index){
  list.splice(index,1)
  localStorage.setItem('sitesList',JSON.stringify(list))
  handleDisplay()
}

function normalizeUrl(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'http://' + url;
  }
  return url;
}

function handleUrl(index){
  window.open(normalizeUrl(list[index].site));
}

function closeBox(){
  warnBox.style.display="none"
}
