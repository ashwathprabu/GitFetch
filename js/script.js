const clientId = "8e38bcc71b977ab9f002"
const clientSecret = "0d364fdf1aca97d17c76bd1d5f3d9476892bf7e1"



document.addEventListener('DOMContentLoaded', function () {
    var el = document.querySelectorAll('.tabs')
    var instance = M.Tabs.init(el, {});
})

const findUser = async (userName) => {

    var ulElem1 = document.getElementById('repos');
    ulElem1.innerHTML = ''

    var ulElem2 = document.getElementById('repos2');
    ulElem2.innerHTML = ''

    var ulElem3 = document.getElementById('follow-pane');
    ulElem3.innerHTML = ''


    const callApi = await fetch(`https://api.github.com/users/${userName}?client_id=${clientId}&client_secret=${clientSecret}`)
    console.log(callApi)
    const userRes = await callApi.json()

    if (userRes.message == "Not Found") {
        console.log("hidden")
        document.getElementById("avtar").src = "./img/pro.png"

    } else {


        console.log(userRes)
        console.log("show usrresabove")
        // console.log(follwDta.followerData.login)
        // =============================================Section -------> 1
        document.getElementById("avtar").src = userRes.avatar_url
        document.getElementById("userName").innerHTML = userRes.name
        // User BioInfo
        if (userRes.bio != null) {
            document.getElementById("bio").innerHTML = "\" " + userRes.bio + " \""
        }
        // User Location
        if (userRes.location != null) {
            document.getElementById("loc").innerHTML = `<i  style="font-size:15px"  class=" Tiny material-icons ">location_on</i>  ${userRes.location}`
        }
        // User E-mail
        if (userRes.email != null) {
            document.getElementById("mail").innerHTML = `<i  style="font-size: 15px"  class=" Tiny material-icons">email</i>   ${userRes.email}`
        }


        // =============================================================Section-2==============
        let repos = await fetch(`https://api.github.com/users/${userName}/repos?client_id=${clientId}&client_secret=${clientSecret}`)
        let reposInfo = await repos.json()
        console.log("below00")
        console.log(reposInfo)

        const totRepos = document.getElementById('totrepos')
        totRepos.innerHTML = reposInfo.length

        reposInfo.forEach(data => {
            console.log("name : ")
            console.log(data.name)
            // appending
            const card = document.getElementById('repos')
            if (data.description == null || data.language == null) {
                document.getElementById("prolink").href = `https://www.github.com/${data.owner.login}`

                card.innerHTML +=
                    `<div class="col s6">
                <div class="collection">
                    <div  class="card-panel z-depth-0">
                    <a href="https://www.github.com/${data.full_name}"style="font:bold" target="_blank" class="under">
                    <i style="font-size:20px" class="Tiny material-icons   grey-text text-darken-1">folder</i>
                    ${data.name}</a><br/><br/>
                    <span id="desc">No Description</span><br/> 
                     </div>
                </div>
             </div>
             <div class="card" id="name"></div>`;

            } else {

                card.innerHTML +=
                    `<div class="col s6">
            <div class="collection">
                <div  class="card-panel z-depth-0">
                <a href="https://www.github.com/${data.full_name}" target="_blank" class="under">
                <i style="font-size:20px;margin-top:14px" class="Tiny material-icons   grey-text text-darken-1">folder</i>
                ${data.name}</a><br/> <br/>
                <span id="desc">${data.description}</span><br/> <br/>
                <span id="lang">
                <i  style="font-size:15px" class="Tiny material-icons purple-text text-darken-3">brightness_1</i> 
                ${data.language}</span>
                </div>
            </div>
         </div>
         <div class="card" id="name"></div>`;

            }



            // =====================sec3======================
            const card1 = document.getElementById('repos2')

            if (data.description == null || data.language == null) {
                document.getElementById("prolink").href = `https://www.github.com/${data.owner.login}`

                card1.innerHTML +=
                    `
                    
                    <div class="col s12">
           
                <div  class="card-panel z-depth-0">
                <a href="https://www.github.com/${data.full_name}" target="_blank" class="under"> 
                ${data.full_name}</a><br/><br/>
                <a href="#!" class="secondary-content" style="font-size:20px"><i style="font-size:20px;" class="material-icons">grade</i>  ${data.stargazers_count}</a>
                <span id="desc">No Description</span><br/>  
                <img src="./img/fork3.svg" style="height: 18px;width:14px;" alt="" srcset=""><span style="font-size:20px;">  ${data.forks_count}</span>
           
                </div>

                 <div class="divider"></div>  
         </div> 
         
         `;

            } else {

                card1.innerHTML +=
                    `<div class="col s12"> 
            <div  class="card-panel z-depth-0">
            <a href="https://www.github.com/${data.full_name}" target="_blank" class="under"> 
            ${data.full_name}</a><br/> 
            <span id="desc">${data.description}</span><br/> <br/>

            <img src="./img/fork3.svg" style="height: 18px;width:14px;" alt="" srcset=""><span style="font-size:20px;">  ${data.forks_count}</span>
             
            <a href="#!" class="secondary-content" style="font-size:20px;"><i style="font-size:20px;" class="material-icons">grade</i>  ${data.stargazers_count}</a>
             </div> 

     <div class="divider"></div> 
     </div> `;

            }
        })
        // ==============================================





        // -============================================section repositories
        console.log("follw sec")
        const followers = await fetch(`https://api.github.com/users/${userName}/followers?client_id=${clientId}&client_secret=${clientSecret}`)
        const followerRes = await followers.json()
        const totfollower = document.getElementById('totfolrs')
        totfollower.innerHTML = followerRes.length
        console.log(followerRes)
        const followCard = document.getElementById('follow-pane')
        followerRes.forEach(data => {


            followCard.innerHTML +=
                `<li class="collection-item avatar">
                
                <img src="${data.avatar_url}" alt="" class="circle">
                <span class="title">${data.login}</span>
                <a href="${data.html_url}" target="_blank" class="secondary-content"><i class="material-icons">send</i></a> 
                 <li> `;
        })
        // =================================================================


    }
}


getUser = () => {
    var userName = document.getElementById("get").value
    findUser(userName)
}