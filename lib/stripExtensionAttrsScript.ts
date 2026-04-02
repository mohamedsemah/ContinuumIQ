/**
 * Injected via next/script strategy="beforeInteractive".
 * Bitdefender (and similar) add `bis_skin_checked`, `bis_register`, etc. before React hydrates,
 * which causes unavoidable hydration mismatches. This removes those markers early.
 */
export const stripExtensionAttrsScript = `(function(){
function shouldRemove(n){
  return n==="bis_skin_checked"||n==="bis_register"||n.indexOf("bis_")===0||n.indexOf("__processed_")===0;
}
function strip(el){
  if(!el||el.nodeType!==1)return;
  var a=el.attributes,i,names=[];
  if(!a)return;
  for(i=0;i<a.length;i++)if(shouldRemove(a[i].name))names.push(a[i].name);
  for(i=0;i<names.length;i++)el.removeAttribute(names[i]);
}
function walk(root){
  if(!root)return;
  strip(root);
  var ch=root.children,i;
  if(!ch)return;
  for(i=0;i<ch.length;i++)walk(ch[i]);
}
function run(){walk(document.documentElement);}
run();
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);
window.addEventListener("load",run);
setTimeout(run,0);
setTimeout(run,50);
setTimeout(run,200);
if(typeof MutationObserver!=="undefined"){
  var mo=new MutationObserver(function(recs){
    var r;
    for(r=0;r<recs.length;r++){
      var rec=recs[r];
      if(rec.type==="attributes"&&rec.target&&rec.attributeName&&shouldRemove(rec.attributeName)){
        rec.target.removeAttribute(rec.attributeName);
      }
    }
  });
  mo.observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:["bis_skin_checked","bis_register"]});
  setTimeout(function(){mo.disconnect();},4000);
}
})();`;
