// هنشتغل علي كل الناس الي عندهم هذا الكلاس update-cart
var updateBtns =document.getElementsByClassName('update-cart')

// هيعمل loop علي كل الذراير
for(i=0; i<updateBtns.length; i++){
    updateBtns[i].addEventListener('click', function(){
        // this = self 
        // السطرين دول هياخدو الي موجود في data-product ,data-action ويحطو قيمتهم داخل ال productId , action الي داخل ال console
        var productId=this.dataset.product
        var action=this.dataset.action
        console.log('productId:', productId, 'Action:',action )

        // user دي انا جايبها من main.html السطر ال 14و15
        console.log('USER:',user)
        if(user == 'AnonymousUser'){
            addCookieItem(productId, action)
        }else{
            updateUserOrder(productId, action)
        }
    })
    
}


function addCookieItem(productId,action){
    console.log('User is not authenticated')

    if (action == 'add'){
        if (cart[productId] == undefined){
            cart[productId]={'quantity': 1}
        
        }else{
            cart[productId]['quantity'] +=1
        }
    }
    if (action == 'remove'){
        cart[productId]['quantity'] -=1

        if(cart[productId]['quantity'] <=0 ){
            console.log("Item shoud be deleted")
            delete cart[productId];
        }
    }
    console.log('Cart:', cart)
    document.cookie= 'cart=' + JSON.stringify(cart)+";domain=;path=/"
    location.reload()

}

// ================================================
// في هذا الكود، يتم إنشاء دالة تسمى updateUserOrder التي تقوم بإرسال بيانات محددة إلى الخادم. تتمثل المهمة الرئيسية
//  لهذه الدالة في إرسال طلب POST إلى عنوان URL محدد (/update_item/) باستخدام fetch.

function updateUserOrder (productId,action){
    console.log('User is  authenticated , sending data...')
    // update_item ده موجود داخل ال view هو ده الي هنبعتله ال data
    var url='/update_item/'

    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        // body =>هي البايانات الي هتروح لل backend الي هي ال VIEWS
        body:JSON.stringify({'productId':productId, 'action':action })
    })

    .then((response) =>{
        return response.json()
    })

    .then((data) =>{
        console.log('data:',data)
        location.reload()
    })
}

// هذا الجزء من الكود يقوم بإرسال طلب POST إلى الخادم باستخدام fetch. يحتوي الطلب على عدة أجزاء مهمة:

// method: يحدد نوع الطريقة التي سيتم استخدامها لإرسال الطلب إلى الخادم، وفي هذه الحالة فإنها POST.

// headers: يحتوي على الرأس المطلوب لإرسال الطلب. في هذا الحالة، يتم تحديد نوع المحتوى كـ "application/json" وتضمين رمز CSRF للتحقق من الصحة.

// body: يحتوي على البيانات التي سيتم إرسالها إلى الخادم. يتم تحويل الكائن المحدد إلى سلسلة JSON باستخدام JSON.stringify قبل إرسالها.

// then: تستخدم لمعالجة الرد المستلم من الخادم. يتم تحويل الرد إلى كائن JSON باستخدام response.json() ومن ثم يتم تنفيذ بعض الإجراءات مثل طباعة البيانات المستلمة وإعادة تحميل الصفحة باستخدام location.reload() لتحديث الصفحة بما يتم إرجاعه من الخادم.