import {useState} from 'react'
import "../styles/PlayerForm.css"

function PlayerForm({ fetchPlayers}){
    const [playerName, setPlayerName] = useState('');
    const [runs, setRuns] = useState('');
    const [strikeRate, setStrikeRate] = useState('');
    const [internationalStatus, setInternationalStatus] = useState('');
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
    

        // Handle form submission logic here
        try{
            const response = await fetch( 'http://localhost:5000/api/players', {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json',
                    'authorization' : `Bearer ${token}`
                },
                body : JSON.stringify({
                    playerName,
                    runs,
                    strikeRate,
                    internationalStatus
                })
                });
                const data = await response.json();
                if(response.ok){
                    window.alert(data.message);
                    fetchPlayers();
                    setPlayerName('');
                    setRuns('');
                    setStrikeRate('');
                    setInternationalStatus('');
                }else{
                    window.alert(data.message);
                }

        }catch(error){
         alert("Error occurred while adding player:", error);
        }
    }



    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Player Name"
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
            />

            <input
                type="number"
                placeholder="Runs"
                value={runs}
                onChange={(event) => setRuns(event.target.value)}
            />

            <input
                type="number"
                placeholder="Strike Rate"
                value={strikeRate}
                onChange={(event) => setStrikeRate(event.target.value)}
            />

            <select
    value={internationalStatus}
    onChange={(event) => setInternationalStatus(event.target.value)}
>

    <option value="">
        Select Status
    </option>

    <option value="Active">
        Active
    </option>

    <option value="Retired">
        Retired
    </option>

</select>

            <button type="submit">

                Add Player

            </button>

        </form>
    )
}

export default PlayerForm;