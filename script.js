document.addEventListener('DOMContentLoaded',() => {

 let dummy = {'title':'task',
 'date_created': '14-09-24',
'task_done':false}

    // TASK-APP_Test_Beta_v1.0_dt=13/01/2024_time=22:56
    // TASK-APP_Test_Beta_v1.1_dt=14/01/2024_time=20:36
    // TASKX_Test_Beta_v1.2_dt=26-01-2024_time=21:36
    
    let alert_cont = document.getElementById("alert_cont")
    let alert = document.getElementById("alert")
    let app_is_in_test = true
    let app_version = '1.2'
    let task_input = document.getElementById('task-input')
    let add_task_btn = document.getElementById('add-task-btn')
    let clear_form_btn = document.getElementById('clear-form-btn')
    let task_add_cont = document.getElementById('task-add')
    let task_cont = document.getElementById('task-cont')
    let task_title = document.getElementsByClassName('task-title')
    let task_dlt_btn = document.getElementsByClassName('dlt-btn')
    let version_disp = document.getElementById('version_disp')
    let report_cont = document.getElementById('report-cont')
    let report_input = document.getElementById('report')
    let report_sub_btn = document.getElementById('report_submit')
    let login_signup_btn = document.getElementById('login-signup-btn')
    let login_form = document.getElementById('login-form')
    let signup_form = document.getElementById('signup-form')
    let do_singup = document.getElementById('do-signup')
    let do_login = document.getElementById('do-login')
    let signup_btn = document.getElementById('signup-btn')
    let login_btnn = document.getElementById('login-btn')
    let l_name = document.getElementById('l-name-inp')
    let l_pass = document.getElementById('l-pass-inp')
    let s_name = document.getElementById('s-name-inp')
    let s_pass = document.getElementById('s-pass-inp')
    let s_confirm_pass = document.getElementById('s-confirm-pass-inp')
    let profile = document.getElementById('profile')
    let banner_cont = document.getElementById('banner-cont')
    let logged_in_acc = []
    
    
    
    let date = new Date

    function show_alert(message,type) {
        alert.innerText = message
        if (type == "success"){
            alert.style.backgroundColor = 'green'
        }
        else if(type == "error"){
            alert.style.backgroundColor = 'red'
        }
        else if(type == "info"){
            alert.style.backgroundColor = 'blue'
        }
        else if(type == "warning"){
            alert.style.backgroundColor = 'yellow'
        }
        alert_cont.style.display = 'block'
        setTimeout(() => {
            alert_cont.style.display = 'none'
        }, 5000);
        
        // alert_cont.style.display = 'block'
        // setInterval(() => {
        //     alert_cont.style.display = 'none'
        // }, 5000);
    }
    function check_login(){
        let accounts_list = JSON.parse(localStorage.getItem('task-app-accounts'))
        let acc_details = []
        for (let index = 0; index < accounts_list.length; index++) {
            const element = accounts_list[index];
            if (element['logged_in'] == true){
                acc_details.push(element)
                logged_in_acc.push(element)
            }
            
        }
        if (acc_details.length == 0){
            console.log('nothing')
            profile.style.display = 'none'
            login_signup_btn.style.display = 'flex'
            task_cont.style.display = 'none'
            task_add_cont.style.display = 'none'
            report_cont.style.display = 'none'
            // banner_cont.style.display = 'block'
        }
        else{
            banner_cont.style.display = 'none'
            task_cont.style.display = 'flex'
            task_add_cont.style.display = 'flex'
            report_cont.style.display = 'flex'
            console.log(acc_details)
            let name = acc_details[0]['username']
            console.log(name)
            show_alert('logged in','success')
            login_signup_btn.style.display = 'none'
            profile.innerText = name
            profile.style.display = 'flex'
        }
        

    }
    check_login()
    function version_display(params) {
        if(app_is_in_test == true){
            version_disp.innerText = 'beta ' + 'v' + app_version
        }
        else{
            version_disp.innerText = 'v' + app_version
        }
        
    }
    version_display()
    
    let tasks
    clear_form_btn.addEventListener('click',clearform)
    function clearform() {
        
        task_input.value = ""
    }

    if (logged_in_acc.length == 0){
        tasks = []
    }
    else{
        let p = logged_in_acc[0]['data']['user_tasks']
        tasks = p
        
    }
    
    function check_localstrg() {
        if (localStorage.getItem('Tasks') == null){
            localStorage.setItem('Tasks','[]')
        }
        else if(localStorage.getItem('task-app-reports') == null){
            localStorage.setItem('task-app-reports','[]')
        }
        else if(localStorage.getItem('task-app-accounts') == null){
            localStorage.setItem('task-app-accounts','[]')
        }
        else{}
    }
    check_localstrg()
    
    add_task_btn.addEventListener('click',function () {
        if((String(task_input.value).trim()) == ''){
            console.log('task cannot be blank')
        }
        else{
            addtask()
        }
    })

    console.log(tasks)

    function displaytasks() {
        if (tasks.length == 0){
            task_cont.innerHTML += `No Tasks To Display`
        }
        else{
            tasks.forEach(ele => {
                task_cont.innerHTML += `<div class="task" >
                <div class="task-title" id="task-title">${ele['title']}</div>
                <div class="btn dlt-btn" id="task-dlt-btn">Delete</div>
            </div>`
            })
        }
    }
    displaytasks()
    
    
    Array.from(task_dlt_btn).forEach((element,index) => {
        element.addEventListener('click',delet)
        
        
    });
    function delet(e) {
        let all_btn_arr = Array.from(task_dlt_btn)
        let target = e.target
        let tasks_list = JSON.parse(localStorage.getItem('Tasks'))
        
        let index_of_target = all_btn_arr.indexOf(target)
        tasks_list.splice(index_of_target,1)
        
        // console.log(tasks_list)/
        let new_arr = JSON.stringify(tasks_list)
        // console.log(new_arr)
        localStorage.setItem('Tasks',new_arr)
        
        
    }
    report_sub_btn.addEventListener('click',submit_report)
    function submit_report() {
        let reports = JSON.parse(localStorage.getItem('task-app-reports'))
        let report = report_input.value
        let report_str ={'title':report,
                        'date_submitted': date.getDate() + '-' + (Number(date.getMonth())+1) + '-' + date.getFullYear(),
                        'Changes_done':false}
        reports.push(report_str)
        let final_reports_list = JSON.stringify(reports)
        localStorage.setItem('task-app-reports',final_reports_list)
    }
    login_signup_btn.addEventListener('click',login_dialog_disp)
    function login_dialog_disp() {
        if(login_form.style.display == 'block' || signup_form.style.display == 'block'){
            login_form.style.display = 'none'
            signup_form.style.display = 'none'
        }
        else{login_form.style.display = 'block'}
        
    }
    do_singup.addEventListener('click',disp_signup)
    function disp_signup() {
        login_form.style.display = 'none'
        signup_form.style.display = 'block'
    }

    do_login.addEventListener('click',() =>{
        signup_form.style.display = 'none'
        login_form.style.display = 'block'
    })

    signup_btn.addEventListener('click',create_account)
    function create_account() {
        let accounts_list = JSON.parse(localStorage.getItem('task-app-accounts'))
        let name = s_name.value
        let pass = s_pass.value
        let confirm_pass = s_confirm_pass.value
        let str  = {
            'username':name,
            'pass':pass,
            'date_created':date.getDate() + '-' + (Number(date.getMonth())+1) + '-' + date.getFullYear(),
            'data':{
                'user_tasks':[]
            },
            'logged_in':false
        }
        if( name.trim() == '' || pass.trim() == '' || confirm_pass.trim() == ''){
            console.log('please fill all the blanks')
        }
        else if(accounts_list.includes(name)){
            console.log('already exist')

        }
        else if(pass != confirm_pass){
            console.log('passwords not matched')
        }
        else{
            accounts_list.push(str)
        let final_acc_list = JSON.stringify(accounts_list)
        localStorage.setItem('task-app-accounts',final_acc_list)
        console.log('account created succesfully')
        }
        
        // console.log(name,pass,confirm_pass,accounts_list)
        
    }

    login_btnn.addEventListener('click',user_login)
    function user_login() {
        let name = l_name.value
        let pass = l_pass.value
        let accounts = JSON.parse(localStorage.getItem('task-app-accounts'))
        let usernames = []
        
        if (name ==''){
            show_alert('Please Enter Email','error')
        }
        else if (pass == ''){
            show_alert('Please Enter Password','error')
        }
        else{
            
            for (let index = 0; index <accounts.length; index++) {
                console.log(index)
                
                let email = accounts[index]["username"]
                usernames.push(email)
                
            }
            
                if (usernames.includes(name)){
                    let index = usernames.indexOf(name)
                    let userpass = accounts[index]["pass"]
                    
                    // console.log(pass)
                    if (pass == userpass){
                        console.log("login succesfull")
                        show_alert('Logined Successfully','success')
                        login_signup_btn.style.display = 'none'
                        profile.innerText = name
                        profile.style.display = 'flex'
                        login_form.style.display = 'none'
                        accounts[index]["logged_in"] = true
                        let final_acc = JSON.stringify(accounts)
                        localStorage.setItem('task-app-accounts',final_acc)

                    }
                    else{
                        console.log("login failed")
                        show_alert('wrong password','error')
                    }
                }   
                else{
                    show_alert('No account found','info')
                }
                // // console.log(email)
                
            }
        // for (let index = 0; index < accounts.length; index++) {
        //     const element = accounts[index];
        //     let username = element['username']
        //     if(name.trim() == '' || pass.trim() == ''){
        //         console.log('please fill all the blanks')
        //     }
        //     else{
        //         if(name == username){
        //             console.log('acc_found')
        //             let userpass = element['pass']
        //             if(pass == userpass){
        //                 console.log('logged in succesfully')
        //             }
        //             else{
        //                 console.log('passwords not matched')
        //             }
        //         }
        //     }
            
            
            
        // }
    }
    
    profile.addEventListener('click',logout)
    function logout(){
        let accounts_list = JSON.parse(localStorage.getItem('task-app-accounts'))
        let logged_in_list = []
        for (let index = 0; index < accounts_list.length; index++) {
            const element = accounts_list[index];
            
                logged_in_list.push(element['logged_in'])
            
            
        }
        let index = logged_in_list.indexOf(true)
        accounts_list[index]["logged_in"] = false
        
        
        let final_acc_list = JSON.stringify(accounts_list)
        localStorage.setItem('task-app-accounts',final_acc_list)
        // console.log(index)
        // console.log(logged_in_list)
        // console.log(accounts_list)
        // acc_details[0]['logged_in'] = false
        // let final_acc = JSON.stringify(accounts_list)
                        // localStorage.setItem('task-app-accounts',final_acc)
        check_login()
        // let name = acc_details[0]['username']
        // console.log(name)
        // show_alert('logged in','success')
        // login_signup_btn.style.display = 'none'
        // profile.innerText = name
        // profile.style.display = 'flex'
    }
    

    
    // Array.from(task_title).forEach((element,index) => {
    //     element.addEventListener('click',task_done)
        
        
    // });

    // function task_done(e) {
    //     let target = e.target
    //     if (target.classList.contains('task-done')){
    //         console.log('taskdone')
    //     }
    //     else{
    //         target.classList.add('task-done')
    //     }
    // }
    
    function addtask() {

        let accounts_list = JSON.parse(localStorage.getItem('task-app-accounts'))
        let logged_in_list = []
        for (let index = 0; index < accounts_list.length; index++) {
            const element = accounts_list[index];
            
                logged_in_list.push(element['logged_in'])
            
            
        }
        let index = logged_in_list.indexOf(true)

        let task = task_input.value
        let task_str ={'title':task,
                        'date_created': date.getDate() + '-' + (Number(date.getMonth())+1) + '-' + date.getFullYear(),
                        'task_done':false}
        // let global_task_cont = 
        tasks.push(task_str)
        accounts_list[index] = logged_in_acc[0]
        let final_task_list = JSON.stringify(accounts_list)
        // console.log(final_task_list)
        
        localStorage.setItem('task-app-accounts',final_task_list)
        // displaytasks()
    
    }
})
