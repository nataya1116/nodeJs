async function getUser() {
    try{
        const res = await axios.get('/users');
        
        const users = res.data;
        const list = document.getElementById('list');
        list.innerHTML = '';
        console.log(users);
        // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map(function (key, value){
            console.log(`key : ${key}`);
            console.log(`value : ${value}`)
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async()=>{   // 수정 버튼 클릭
                const name = prompt('바꿀 이름을 입력하세요');
                if(!name) {
                    return alert('이름을 반드시 입력하셔야 합니다.')
                }
                try{
                    await axios.put('/user/'+key, {name});
                    getUser();
                }catch(err){
                    console.error(err);
                }
            });
            const remove = document.createElement('button');
            remove.textContent = '삭제';    
            remove.addEventListener('click', async()=>{ //삭제 버튼 클릭
                try{
                    await axios.delete('/user/'+key);
                    getUser();
                }catch (err){
                    console.error(err);
                }

            });
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
            console.log(res.data);
        });
    }catch(err){
        console.error(err);
    }
}

window.onload = getUser;    // 화면 로딩시 getUser 호출
// 폼 계층(submit) 시 실행
document.getElementById('form').addEventListener('submit', async(event)=>{
    event.preventDefault(); // 동작 막기
    const name = event.target.username.value;
    if(!name){
        return alert('이름을 입력하세요');
    }
    try{
        await axios.post('/user', {name});
        getUser();
    }catch(err){
        console.error(err);
    }
    event.target.username.value = '';
})