import './App.css'

function App()
{
  return (
    <div>
      <div>
        <div>
          <span>Find</span>
          <input placeholder='Type an adress'/>
          <button> Search </button>
        </div>
        <div>
          <div><button> Food A </button> <button> Food B </button> <button> Food C </button></div>
        </div>
        <div> <input placeholder='Filter critere'/> </div>
        <div>
          <div>
            <h3> Restaurant A</h3>
            <img  src ='./' />
            <div>
              <span> Address</span>
              <span> Phone</span>
              <span> Website</span>
              <span> Schedule</span>
            </div>
          </div>
          <div>
            <h3> Restaurant B</h3>
            <img  src ='./' />
            <div>
              <span> Address</span>
              <span> Phone</span>
              <span> Website</span>
              <span> Schedule</span>
            </div>
          </div>
        </div>
      </div>
      <div> Restaurant Card Component </div>
    </div>
  )
}

export default App
