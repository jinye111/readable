export function vote(data1,data2,data3){
		fetch(`http://localhost:3001/${data1}/${data2}`,
	        {
	        	method:'POST',
	            headers: { 'Authorization': 'whatever-you-want','Content-Type': 'application/json' },
	            body: JSON.stringify({option:data3})
	        }
	    ).then(res=>res.json()).then(data => {if(data1==='comments') this.props.addVote(data); else this.props.addPostVote(data)})		
}