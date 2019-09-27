function hide_addnote_popup()
{
	document.getElementById('addnote_popup').style.display='none';
}

function show_addnote_popup()
{
	document.getElementById('addnote_popup').style.display='block';
}

function savedata()
{
	newtitle=document.getElementById('newtitle').value;
	newnote=document.getElementById('newnote').value;

	note={
		"title":newtitle,
		"note":newnote
	};

	//Get Old value from the local storage
	notes=JSON.parse(localStorage.getItem("noteapp"));
	if(notes==null)
	{
		notes=Array(note);
	}
	else
	{
		notes.push(note);
	}

	localStorage.setItem("noteapp",JSON.stringify(notes));
	alert('Note Saved');
	document.getElementById('newtitle').value="";
	document.getElementById('newnote').value="";

	loadnotes();
}


function loadnotes()
{
	notes=JSON.parse(localStorage.getItem("noteapp"));
	document.getElementById('notes').innerHTML="";

	for(i=0;i<notes.length;i++)
	{
		note = document.createElement('div');
		note.setAttribute("class","note");

		h1 = document.createElement('h1');
		h1.innerHTML=notes[i].title;

		p=document.createElement('p');
		p.innerHTML=notes[i].note;

		img = document.createElement('img');
		img.setAttribute("src","cancel.png");


		img.addEventListener("click",function(){
			note=this.parentElement;

			title = note.getElementsByTagName('h1')[0].innerHTML;
			notes=JSON.parse(localStorage.getItem("noteapp"));
			temp=Array();

			for(i=0;i<notes.length;i++)
			{
				if(notes[i].title!=title)
				{
					temp.push(notes[i]);
				}
			}

			localStorage.setItem("noteapp",JSON.stringify(temp));


			document.getElementById("notes").removeChild(note);
		});


		note.appendChild(h1);
		note.appendChild(p);
		note.appendChild(img);

		document.getElementById('notes').appendChild(note);
	}
}

onload=function()
{
	loadnotes();
}


