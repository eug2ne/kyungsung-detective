import { ref } from 'vue'

const loadlists = () => {
    // fetch wordlist, mergelist
    const mergelist = ref({})
    const wordlist = ref({})
    
    const load = async () => {
      try {
        const m_respose = await fetch('http://localhost:3000/mergelist')
        mergelist.value = await m_respose.json()

        const w_response = await fetch('http://localhost:3000/wordlist')
        wordlist.value = await w_response.json()
      }
      catch (error) {
        console.log(error.message)
      }
    }

    load()

    return { mergelist, wordlist }
}

export default loadlists