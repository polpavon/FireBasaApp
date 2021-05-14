

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCJy_OAGz34Kp_RTewPhwTj4xXNy2gTjH8",
    authDomain: "test-c3e03.firebaseapp.com",
    projectId: "test-c3e03",
    storageBucket: "test-c3e03.appspot.com",
    messagingSenderId: "959212097850",
    appId: "1:959212097850:web:d377c0cecc024fb61f0003"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const list = document.querySelector('ul');
const form = document.querySelector('form');


const addReplica = (replica, id) => {
    let dataGuardada = replica.created_at.toDate();
    let diaData = dataGuardada.getDate();
   let mesData = dataGuardada.getMonth() + 1;
   let anyData = dataGuardada.getFullYear();
   diaData = (diaData < 10) ? "0" + diaData : diaData;
   mesData = (mesData < 10) ? "0" + mesData : mesData;
   let dataAMostrar = diaData + "/"
      + mesData + "/"
      + anyData;
    let html = `
        <li data-id="${id}" class="replica">
            <div><b>-REPLICA:</b> ${replica.replica}</div>
            <div><b>-MARCA:</b> ${replica.marca}</div>
            <div><b>-PESO:</b> ${replica.peso}</div>
            <div><b>-POTENCIA:</b> ${replica.potencia}</div>
            <div><b>-FECHA:</b> ${dataAMostrar}</div>
            <button class="btn btn-danger btn-sm my-2">Borrar</button>
        </li>
    `;
    console.log(html);
    list.innerHTML += html;
    
};

// add documents
form.addEventListener('submit', e => {
    e.preventDefault();
    let now = new Date();
    const replica = {
        replica: form.replica.value,
        marca: form.marca.value,
        peso: form.peso.value,
        potencia: form.potencia.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    form.replica.value = "";
    form.marca.value = "";
    form.peso.value = "";
    form.potencia.value = "";
    db.collection('replicas').add(replica)
    .then(() => alert('replica añadida!'))
    .catch(err => console.log(err));
    
});
 // delete documents
list.addEventListener('click', e => {
    //console.log(e);
    if(e.target.tagName === 'BUTTON') {
        // Delete recipe
        const id = e.target.parentElement.getAttribute('data-id');
        //console.log(id);
        db.collection('replicas').doc(id).delete()
            .then(() => console.log('replica eliminada!'))
            .catch((err) => console.log(err));
    }
});


// db.collection('recipes').get()
//     .then(snapshot => {
//         // console.log(snapshot.docs[0].data());
//         snapshot.forEach(doc => {
//             // console.log(doc.data());
//             console.log(doc.id);
//             addRecipe(doc.data(),doc.id);
//         });
//     })
//     .catch(err => console.log(err));



db.collection('replicas').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        const doc = change.doc;
        if (change.type === 'added') {
            addReplica(doc.data(), doc.id);
        } else if (change.type === 'removed') {
            deleteReplica(doc.id);
        }
    });
});

const deleteReplica = id => {
    const replicas = document.querySelectorAll('li');
    replicas.forEach(replica => {
        if(replica.getAttribute('data-id') === id) {
            replica.remove();
        }
    });
};
    