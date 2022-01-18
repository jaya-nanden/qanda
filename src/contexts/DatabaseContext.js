import React, { useContext, useState, useEffect } from "react";

import { database } from '../firebase-config'
import { 
    set, 
    ref,
    child,
    onValue,
    get,
    remove,
    update,
} from "firebase/database"

import { useAuth } from "./AuthContext";

const DatabaseContext = React.createContext()

export function useDatabase() {
    return useContext(DatabaseContext)
}

export function DatabaseProvider({ children }) {

    const [questions, setQuestions] = useState(null)
    const [tagsData, settagsData] = useState({})
    const [initialPreference, setPreference] = useState([{tag: 'general', selected: false}])
    const [shieldRequests, setshieldRequests] = useState([])
    const [individualQuestion, setIndividualQuestion] = useState(null)

    const { currentUser } = useAuth()

    // Creating new user with pre-defined json format 
    function createNewUser(user) {
        // console.log(user.uid)
        // console.log(initialPreference);
        get(ref(database, 'users/' + user.uid)).then((snapshot) => {
            // console.log(snapshot.exists());
            if(snapshot.exists()) {
                // console.log('existing user');
            } else {
                // const newPreferenceList = []
                // tagsData.tags?.list.map(val => {
                //         return newPreferenceList.push({ tag: val, selected: false })
                // })
                set(ref(database, 'users/' + user.uid), {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    newUser: true,
                    preference: initialPreference,
                    noOfQuestions: 0,
                    noOfAnswers: 0,
                })
            }
        }).catch(error => {
            console.log(error);
            const newPreferenceList = []
                tagsData.tags?.list.map(val => {
                        return newPreferenceList.push({ tag: val, selected: false })
            })
            set(ref(database, 'users/' + user.uid), {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                newUser: true,
                preference: newPreferenceList,
                noOfQuestions: 0,
                noOfAnswers: 0,
            })
        })
        
    }


    // Write Question
    function writeUserData(questionID, uid, username, question, answer, datetime, tagsList, imgUrl) {
        // console.log(serverStamp.now());
        
        set(ref(database, 'questions/' + questionID), {
          uid: uid,
          username: username,
          question: question,
          createdAt: datetime,
          tags: tagsList,
          imgUrl: imgUrl,
          likes: 0,
          dislikes: 0,
          description: answer,
          answers: [{
              uid: uid, 
              ans: '',
              username: username
            }]
        });

        // write tags to separate child 'tags/' for list maintaining
        addTagList(tagsList)
        // console.log('added question to db');
    }


    // Adding tags from new questions into original list
    function addTagList(tagsList) {
        // console.log(tagsData);
        let tags = []
        if(tagsData.tags?.list) {
            tags = tagsData.tags.list
        }
        // let merge = tags.concat(tagsList);
        let newmerge = [...new Set([...tags,...tagsList])]
        // console.log(merge)
        // console.log(newmerge);
        update(ref(database, 'createdTags/tags'), {
            list: newmerge
        })
        // console.log('updated tags list');
    }


    // Add qid to user's question list
    function addQuestionIDToUser(qid) {
        // console.log(uid, qid);
        const unsub = get(ref(database, 'users/' + currentUser.uid)).then((snapshot) => {
            
            if(snapshot.exists()) {
                if(snapshot.val().questionIDList) {
                    if(snapshot.val().questionIDList.length !== 0) {
                        // console.log('have previous questions');
                        // console.log(snapshot.val().questionIDList);
        
                        const qIDList = snapshot.val().questionIDList
                        qIDList.push(qid)
                        
                        const preferenceList = snapshot.val().preference
                        const new_noOfQuestions = snapshot.val().noOfQuestions + 1
                        update(ref(database, 'users/' + currentUser.uid), {
                            email: currentUser.email,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                            newUser: false,
                            preference: preferenceList,
                            questionIDList: qIDList,
                            noOfQuestions: new_noOfQuestions,
                            noOfAnswers: snapshot.val().noOfAnswers,
                        })
                    }
                } else {
                    // console.log('no previous questions')
                    const preferenceList = snapshot.val().preference
                    // console.log(preferenceList);
                    const new_noOfQuestions = snapshot.val().noOfQuestions + 1
                    update(ref(database, 'users/' + currentUser.uid), {
                            email: currentUser.email,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                            newUser: false,
                            preference: preferenceList,
                            questionIDList: [qid],
                            noOfQuestions: new_noOfQuestions,
                            noOfAnswers: snapshot.val().noOfAnswers,
                    })
                }
            }
        }).catch(error => {
            console.log(error);
        })
        
        // console.log("added qid to user's list");
        return unsub
    }


    function getQuestionData(qid) {
        get(ref(database, 'questions/' + qid)).then((snapshot) => {
            if(snapshot.exists()) {
                const data = snapshot.val()
                setIndividualQuestion(data)
            } else {
                setIndividualQuestion('no-data')
            }
        }).catch(error => {
            console.log(error);
        })
    }


    // Write Answer to particular qid
    function writeAnswer(qid, uid, answer, username, index) {
        update(ref(database, 'questions/' + qid + '/answers/' + index), {
            uid: uid,
            ans: answer,
            username: username
        })
        // return 'added answer'
    }


    function removeQuestion(qid, shield) {
        // console.log(qid);
        // console.log(shield);

        if(shield) {
            console.log("Need to Update Shield Requests Database");
            // update(ref(database, 'shieldRequests/'), {})
        }
        // Remove the whole question data
        remove(ref(database, 'questions/' + qid))
        // console.log('Question Deleted Successfully');

        // Remove that qid from users/uid/questionIDList
        const unsub = get(ref(database, 'users/' + currentUser.uid)).then((snapshot) => {
            
            if(snapshot.exists()) {
                if(snapshot.val().questionIDList) {
                    if(snapshot.val().questionIDList.length !== 0) {
                        // console.log('have previous questions');
                        // console.log(snapshot.val().questionIDList);
        
                        const qIDList = snapshot.val().questionIDList
                        // Remove that qid
                        const index = qIDList.indexOf(qid)
                        if(index > -1) {
                            qIDList.splice(index, 1)
                        } 
                        
                        const preferenceList = snapshot.val().preference
                        update(ref(database, 'users/' + currentUser.uid), {
                            email: currentUser.email,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                            newUser: false,
                            preference: preferenceList,
                            questionIDList: qIDList,
                        })
                    }
                } else {
                    // console.log('no question ids')
                }
            }
        }).catch(error => {
            console.log(error);
        })
        
        return unsub
    }

    function requestToRemove(qid, reason) {
        // console.log('req to remove');

        const unsub = get(ref(database, '/')).then((snapshot) => {
            // console.log(snapshot.val());
            if(snapshot.exists()) {
                if(snapshot.val().shieldRequests) {
                    if(snapshot.val().shieldRequests.list) {
                        if(snapshot.val().shieldRequests.list.length !== 0) {
                            let oldRequests = snapshot.val().shieldRequests.list
                            
                            // Check the question id already exists then increase the count by 1
                            let flag = 0
                            oldRequests.forEach(temp => {
                                if(temp.qid === qid) {
                                    temp.count += 1;
                                    let user_reasons = temp.userReason
                                    user_reasons.push({ uid: currentUser.uid, reason})
                                    // setting the flag to true
                                    flag = 1
                                }
                            });

                            // First Shield of Particular Question
                            if(flag === 0) {
                                const count = 1
                                const userReason = [{ uid: currentUser.uid, reason}]
                                oldRequests.push({qid, userReason, count})
                            }

                            oldRequests = [...new Set(oldRequests)];
        
                            update(ref(database, 'shieldRequests'), {
                                list: oldRequests
                            })
                        }
                    }
                } else {
                    // First Question in Shield
                    const count = 1
                    const userReason = [{ uid: currentUser.uid, reason}]
                    set(ref(database, 'shieldRequests'), {
                        list: [{qid, count, userReason}]
                    });
                }
            } 
        })
        return unsub
    }

    function removeShieldRequest(qid) {
        const unsub = get(ref(database, 'shieldRequests/')).then((snapshot) => {
            // console.log(snapshot.val());
            if(snapshot.exists()) {
                if(snapshot.val().list) {
                    if(snapshot.val().list.length !== 0) {
                        let oldRequests = snapshot.val().list

                        const index = oldRequests.indexOf(qid)
                        if(index > -1) {
                            oldRequests.splice(index, 1)
                        }
                        // console.log(index);
                        // console.log(oldRequests);
    
                        update(ref(database, 'shieldRequests'), {
                            list: oldRequests
                        })
                    }
                }
            } 
        })
        return unsub
    }

    // Remove specific answer for specific question and update answer's index
    function removeAnswerWithIndex(qid, index) {
        // index++
        // console.log(qid, index);

        // Remove the particular index of answers in qid
        remove(ref(database, 'questions/' + qid + '/answers/' + index))

        // Rewrite the answers with correct index
        const unsub = get(ref(database, 'questions/' + qid)).then((snapshot) => {
            // console.log(snapshot.val());
            if(snapshot.exists()) {
                if(snapshot.val().answers) {
                    const data = snapshot.val()
                    // console.log(data);

                    let new_answers = []
                    let ind = 0
                    data.answers.forEach(element => {
                        // console.log(element);
                        new_answers[ind++] = element
                    });
                    console.log(new_answers);

                    update(ref(database, 'questions/' + qid), {
                        answers: new_answers,
                        createdAt: data.createdAt,
                        dislikes: data.dislikes,
                        imgUrl: data.imgUrl,
                        likes: data.likes,
                        question: data.question,
                        uid: data.uid,
                        username: data.username
                    })

                } else {
                    // set(ref(database, 'shieldRequests'), {
                    //     list: [qid]
                    // });
                }
            } 
        })
        return unsub
    }

    // Updating the preference of users
    function addTagsPreference(uid, preference) {
        const dbRef = ref(database, 'users/' + uid)
        update(dbRef, {
            preference: preference
        })
        // console.log('updated');
        return 'updated'
    }
    

    const value = {
        database,
        questions,
        fetchQuestions,
        createNewUser,
        writeUserData,
        addQuestionIDToUser,
        getQuestionData,
        individualQuestion,
        writeAnswer,
        removeQuestion,
        requestToRemove,
        removeShieldRequest,
        shieldRequests,
        removeAnswerWithIndex,
        tagsData,
        initialPreference,
        addTagsPreference,
    }

    // Fetch Initialize Questions once user logged in
    function fetchQuestions() {
        const dbref = ref(database, 'questions/')
        // const myquery = query(dbref, orderByChild('createdAt'), )

        const unsubscribe = onValue(dbref, (snapshot) => {
            const data = snapshot.val()
            // console.log("using onValue")
            // console.log(data)
            setQuestions(data)
        });
        return unsubscribe
    }

    // Use Effect - Getting Questions
    useEffect(() => {
        const dbref = ref(database, 'questions/')
        // const myquery = query(dbref, orderByChild('createdAt'), )

        const unsubscribe = onValue(dbref, (snapshot) => {
            const data = snapshot.val()
            // console.log("using onValue")
            // console.log(data)
            setQuestions(data)
        });
        return unsubscribe

    }, [])

    // Use Effect - Getting Tags
    useEffect(() => {
        const dbref = ref(database, 'createdTags/')
        // const myquery = query(dbref, orderByChild('createdAt'), )

        const unsubscribe = onValue(dbref, (snapshot) => {
            const data = snapshot.val();

            if(data) {
                // console.log(data);
                if(data) {
                    settagsData(data)
                }
            } else {
                let tagsList = []
                let ind = 0
                initialPreference.forEach(temp => {
                    tagsList[ind++] = temp.tag 
                });
                set(dbref, {
                    tags: {
                        list: tagsList
                    }
                })
                settagsData(tagsList)
            }
        });

        // console.log(tagsData.tags.merge);
        return unsubscribe

    }, [])

    // Use Effect - Getting Shields        
    useEffect(() => {
        const dbref = ref(database, 'shieldRequests/')
        const unsubscribe = onValue(dbref, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            setshieldRequests(data.list)
        });
        return unsubscribe
    }, [])

    // Use Effect - Getting Tags respective with user
    useEffect(() => {
        const newPreferenceList = []
        tagsData.tags?.list.map(val => {
            return newPreferenceList.push({ tag: val, selected: false })
        })

        // console.log(newPreferenceList);

        if(currentUser) {
            const unsub = get(ref(database, 'users/' + currentUser.uid)).then((snapshot) => {
                if(snapshot.exists()) {
                    // console.log('existing user');
                    // console.log(snapshot.val().preference);
                    if(snapshot.val().preference) {
                        const dbPreference = snapshot.val().preference
    
                        const dbPreferenceList = []
                        dbPreference.map(collection => {
                            return dbPreferenceList.push(collection.tag)
                        })
    
                        newPreferenceList.forEach(item => {
                            // console.log(dbPreferenceList.includes(item.tag));
                            if(dbPreferenceList.includes(item.tag) === false) {
                                // console.log(item.tag);
                                dbPreference.push({ tag: item.tag, selected: false})
                            }
                        });
    
                        // console.log(dbPreference);
    
                        setPreference(dbPreference)
                        update(ref(database, 'users/' + currentUser.uid), {
                            email: currentUser.email,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                            newUser: false,
                            preference: dbPreference,
                        })
                    }
                } else {
                    setPreference(newPreferenceList)
                }
            }).catch(error => {
                console.log(error);
            })
            
            return unsub
        }
    }, [currentUser, tagsData])

    

    return (
        <DatabaseContext.Provider value={value}>
            { children }
        </DatabaseContext.Provider>
    )
}