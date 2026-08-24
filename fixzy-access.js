/* FIXZY ACCESS STANDARD v1
   Master access model used by child pages.
   Index is the authority for menu permissions; this helper standardizes
   the identity/data boundary used by every Firebase page.
*/
(function(){
  "use strict";
  function norm(v){return String(v??"").trim().toLowerCase();}
  function roleOf(profile){return norm(profile&&profile.role);}
  function isSuperadmin(profile,user){
    const r=roleOf(profile), e=norm(user&&user.email);
    return r==="superadmin" || r==="super_admin" || e==="servicehpmaja@gmail.com";
  }
  function resolveOwnerUid(profile,user){
    const uid=String(user&&user.uid||"").trim();
    const r=roleOf(profile);
    if(r==="owner" || r==="superadmin" || r==="super_admin" || r==="admin") return uid;
    return String(profile&& (profile.ownerUid||profile.ownerId) || uid).trim();
  }
  function identity(profile,user){
    const uid=String(user&&user.uid||"").trim();
    const ownerUid=resolveOwnerUid(profile,user);
    return {
      uid,
      ownerUid,
      ownerId:ownerUid,
      businessUid:ownerUid,
      ownerEmail:String(profile&&profile.ownerEmail || user&&user.email || "").trim().toLowerCase(),
      konterId:String(profile&& (profile.konterId||profile.idKonter) || "").trim()
    };
  }
  function matches(data,ctx){
    if(!data||!ctx||!ctx.ownerUid)return false;
    const vals=[
      data.ownerUid,data.ownerId,data.businessUid,data.uidOwner,
      data.pemilikUid,data.konterOwnerUid
    ].map(v=>String(v??"").trim()).filter(Boolean);
    if(vals.includes(ctx.ownerUid)) return true;
    /* Legacy documents: owner UID may have been stored as uid. */
    if(String(data.uid??"").trim()===ctx.ownerUid)return true;
    if(ctx.ownerEmail && [data.ownerEmail,data.emailOwner].map(v=>String(v??"").trim().toLowerCase()).includes(ctx.ownerEmail)) return true;
    if(ctx.konterId && String(data.konterId??data.idKonter??"").trim()===ctx.konterId) return true;
    return false;
  }
  window.FIXZY_ACCESS={norm,roleOf,isSuperadmin,resolveOwnerUid,identity,matches,
    ownerFields:["ownerUid","ownerId","businessUid","uid"],
    legacyOwnerFields:["ownerEmail","konterId"]};
})();
