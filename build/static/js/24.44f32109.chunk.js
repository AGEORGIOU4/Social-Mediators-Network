(this["webpackJsonp@coreui/coreui-pro-react-admin-template-starter"]=this["webpackJsonp@coreui/coreui-pro-react-admin-template-starter"]||[]).push([[24],{660:function(e,t,a){"use strict";a.r(t);var i=a(542),n=a.n(i),s=a(543),c=a(172),l=a(173),r=a(180),o=a(174),d=a(175),h=a(1),u=a.n(h),j=a(18),m=a(540),b=a(578),O=a(544),g=a(552),x=[{label:"Computing",value:"Computing"},{label:"Law",value:"Law"},{label:"Physics",value:"Physics"},{label:"Technology",value:"Technology"},{label:"Business",value:"Business"},{label:"Other",value:"Other"}],f=a(545),p=a(558),v=a.n(p),y=function(e,t){v.a.mixin({toast:!0,position:"bottom-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!1,didOpen:function(e){e.addEventListener("mouseenter",v.a.stopTimer),e.addEventListener("mouseleave",v.a.resumeTimer)}}).fire({icon:e,title:t})},C=a(22),k=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var i;return Object(c.a)(this,a),(i=t.call(this,e)).uploadPhoto=function(){var e="images/".concat(i.state.initialValues.email).concat("-avatar"),t=Object(b.b)(),a=Object(b.c)(t,e);""!==i.state.image?(i.setState({loading:!0}),Object(b.d)(a,i.state.image).then((function(a){Object(b.a)(Object(b.c)(t,e)).then((function(e){i.setState({picture:e})})),y("success","Uploaded succesfully!"),i.setState({loading:!1})}))):y("warning","Forgot something? :)")},i.editUser=function(){var e=Object(s.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(O.g)(Object(O.c)(t,"users",i.state.email),{email:i.state.email,firstName:i.state.firstName,lastName:i.state.lastName,nickname:i.state.nickname,qualifications:i.state.qualifications,areaOfInterest:i.state.areaOfInterest,bio:i.state.bio,picture:i.state.picture,createdAt:i.state.createdAt});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),i.state={initialValues:{email:"",firstName:"",lastName:"",nickname:"",qualifications:"",areaOfInterest:"",bio:"",picture:"avatar.png",createdAt:""},loading:!1,email:"",firstName:"",lastName:"",nickname:"",qualifications:"",areaOfInterest:"",bio:"",picture:"avatar.png",createdAt:"",image:""},e.location.state&&(i.state.initialValues=e.location.state,i.state.email=i.state.initialValues.email,i.state.firstName=i.state.initialValues.firstName,i.state.lastName=i.state.initialValues.lastName,i.state.nickname=i.state.initialValues.nickname,i.state.qualifications=i.state.initialValues.qualifications,i.state.bio=i.state.initialValues.bio,i.state.areaOfInterest=i.state.initialValues.areaOfInterest,i.state.picture=i.state.initialValues.picture?i.state.initialValues.picture:"avatar.png",i.state.createdAt=i.state.initialValues.createdAt),i.handleChangeFirstName=i.handleChangeFirstName.bind(Object(r.a)(i)),i.handleChangeLastName=i.handleChangeLastName.bind(Object(r.a)(i)),i.handleChangeNickname=i.handleChangeNickname.bind(Object(r.a)(i)),i.handleChangeQualifications=i.handleChangeQualifications.bind(Object(r.a)(i)),i.handleChangeBio=i.handleChangeBio.bind(Object(r.a)(i)),i.handleChangeAreaOfInterest=i.handleChangeAreaOfInterest.bind(Object(r.a)(i)),i.handleChangePicture=i.handleChangePicture.bind(Object(r.a)(i)),i.handleSubmit=i.handleSubmit.bind(Object(r.a)(i)),i}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.getCookie("session")&&(document.getElementById("email").value=this.state.initialValues.email,document.getElementById("firstName").value=this.state.initialValues.firstName,document.getElementById("lastName").value=this.state.initialValues.lastName,document.getElementById("nickname").value=this.state.initialValues.nickname,document.getElementById("qualifications").value=this.state.initialValues.qualifications,document.getElementById("bio").value=this.state.initialValues.bio)}},{key:"handleChangeFirstName",value:function(e){this.setState({firstName:e.target.value})}},{key:"handleChangeLastName",value:function(e){this.setState({lastName:e.target.value})}},{key:"handleChangeNickname",value:function(e){this.setState({nickname:e.target.value})}},{key:"handleChangeQualifications",value:function(e){this.setState({qualifications:e.target.value})}},{key:"handleChangeBio",value:function(e){this.setState({bio:e.target.value})}},{key:"handleChangeAreaOfInterest",value:function(e){this.setState({areaOfInterest:e.target.value})}},{key:"handleChangePicture",value:function(e){this.setState({picture:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this;v.a.fire({text:"Is your profile card correct?",showCancelButton:!0,icon:"question",confirmButtonText:"Yes",confirmButtonColor:"#2eb85c"}).then((function(e){e.isConfirmed&&(t.editUser(f.a),v.a.mixin({toast:!0,position:"bottom-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!1,didOpen:function(e){e.addEventListener("mouseenter",v.a.stopTimer),e.addEventListener("mouseleave",v.a.resumeTimer)}}).fire({icon:"success",title:"Updated successfully"}),window.location.href="/")})),e.preventDefault()}},{key:"getCookie",value:function(e){for(var t=e+"=",a=decodeURIComponent(document.cookie).split(";"),i=0;i<a.length;i++){for(var n=a[i];" "===n.charAt(0);)n=n.substring(1);if(0===n.indexOf(t))return n.substring(t.length,n.length)}return""}},{key:"render",value:function(){var e=this;return this.getCookie("session")?Object(C.jsxs)(m.Q,{children:[Object(C.jsx)(m.o,{sm:12,md:6,style:{flexBasis:"auto"},children:Object(C.jsxs)(m.f,{children:[Object(C.jsx)(m.i,{children:Object(C.jsx)("h4",{style:{margin:"0px"},children:Object(C.jsx)("strong",{children:"Edit Profile Card"})})}),Object(C.jsx)(m.g,{children:Object(C.jsxs)(m.z,{children:[Object(C.jsx)(m.L,{children:"Email"}),Object(C.jsx)(m.G,{id:"email",type:"text",name:"email",readOnly:!0}),Object(C.jsx)(m.L,{children:"First Name"}),Object(C.jsx)(m.G,{required:!0,type:"text",id:"firstName",name:"firstName",onChange:this.handleChangeFirstName}),Object(C.jsx)(m.L,{children:"Last Name"}),Object(C.jsx)(m.G,{type:"text",id:"lastName",name:"lastName",onChange:this.handleChangeLastName}),Object(C.jsx)(m.L,{children:"Nickname"}),Object(C.jsx)(m.G,{type:"text",id:"nickname",name:"nickname",onChange:this.handleChangeNickname}),Object(C.jsx)(m.L,{children:"Qualifications/Experiences"}),Object(C.jsx)(m.G,{type:"text",id:"qualifications",name:"qualifications",onChange:this.handleChangeQualifications}),Object(C.jsx)(m.L,{children:"Few words about you"}),Object(C.jsx)(m.fb,{style:{marginBottom:"23px"},id:"bio",name:"bio",size:"md",type:"textarea",rows:"7",onChange:this.handleChangeBio})]})})]})}),Object(C.jsxs)(m.o,{sm:12,md:6,style:{flexBasis:"auto"},children:[Object(C.jsxs)(m.f,{children:[Object(C.jsx)(m.i,{children:"Area of interest"}),Object(C.jsx)(m.g,{children:Object(C.jsx)(m.R,{value:this.state.areaOfInterest,onChange:this.handleChangeAreaOfInterest,children:x.map((function(e){return Object(C.jsx)("option",{value:e.value,children:e.label},e.value)}))})})]}),Object(C.jsxs)(m.f,{children:[Object(C.jsx)(m.i,{children:"Photo"}),Object(C.jsx)(m.g,{children:Object(C.jsxs)("div",{children:[Object(C.jsxs)("div",{style:{display:this.state.loading?"none":"block"},children:[Object(C.jsx)(m.o,{lg:"12",xs:"12",md:"12",style:{textAlign:"left",paddingLeft:"0px"},children:Object(C.jsx)("input",{type:"file",onChange:function(t){e.setState({image:t.target.files[0]}),e.state.image=t.target.files[0],e.state.image&&e.uploadPhoto()}})}),Object(C.jsx)(m.o,{lg:"12",xs:"12",md:"12",style:{textAlign:"end",paddingRight:"0px"},children:Object(C.jsx)(m.e,{color:"secondary",onClick:this.uploadPhoto,children:"Upload"})})]}),Object(C.jsx)("div",{style:{display:this.state.loading?"block":"none"},children:Object(C.jsx)("center",{children:Object(C.jsx)(m.o,{children:Object(C.jsx)(m.ab,{color:"primary",grow:!0})})})})]})})]}),Object(C.jsxs)(m.f,{children:[Object(C.jsx)(m.i,{children:Object(C.jsx)("h4",{style:{margin:"0px"},children:Object(C.jsx)("strong",{children:"Profile Card"})})}),Object(C.jsx)(m.g,{children:Object(C.jsxs)(m.Q,{children:[Object(C.jsx)(m.o,{xs:"12",md:"12",lg:"8",children:Object(C.jsxs)("div",{children:[Object(C.jsxs)(m.o,{children:[Object(C.jsx)("span",{children:Object(C.jsx)("strong",{children:"Email: "})})," ",this.state.initialValues.email]}),Object(C.jsxs)(m.o,{children:[Object(C.jsx)("span",{children:Object(C.jsx)("strong",{children:"First name: "})})," ",this.state.firstName]}),Object(C.jsxs)(m.o,{children:[Object(C.jsx)("span",{children:Object(C.jsx)("strong",{children:"Last name: "})})," ",this.state.lastName]}),Object(C.jsxs)(m.o,{children:[Object(C.jsx)("span",{children:Object(C.jsx)("strong",{children:"Nickname: "})})," ",this.state.nickname]}),Object(C.jsxs)(m.o,{children:[Object(C.jsx)("span",{children:Object(C.jsx)("strong",{children:"Qualifications/Experiences: "})})," ",this.state.qualifications]}),Object(C.jsxs)(m.o,{children:[Object(C.jsx)("span",{children:Object(C.jsx)("strong",{children:"Area of interest: "})})," ",this.state.areaOfInterest]}),Object(C.jsxs)(m.o,{children:[Object(C.jsx)("span",{children:Object(C.jsx)("strong",{children:"About you: "})}),Object(C.jsx)(g.a,{text:this.state.bio,maxLine:"1",ellipsis:"...",trimRight:!0,basedOn:"letters"})]})]})}),Object(C.jsx)(m.o,{xs:"12",md:"4",lg:"4",style:{textAlign:"center"},children:Object(C.jsx)("div",{style:{padding:"10px"},children:Object(C.jsx)(m.F,{src:this.state.picture,width:"100",height:"100",shape:"rounded-circle"})})})]})}),Object(C.jsx)(m.h,{children:Object(C.jsx)("div",{style:{textAlign:"end"},children:Object(C.jsx)(m.e,{color:"primary",onClick:this.handleSubmit,children:"Update"})})})]})]})]}):Object(C.jsx)(j.b,{render:function(e){return e.history.push("/")}})}}]),a}(u.a.Component);t.default=k}}]);
//# sourceMappingURL=24.44f32109.chunk.js.map