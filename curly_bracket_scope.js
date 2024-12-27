function loop_string_scope(m){

	let backtick = false
	let quote = false
	let double_quote = false
	let slash = false // regex
	
	let curly_bracket = false

	let w = [{ level:0, array: [] }]
	let level = 0
	let count_line = 1

	let bool_next_char = false

	for( let i=0;i<m.length;i++ ){

		global["end_curly_bracket"] = false

		if( m[i] == "\n" ) count_line++

		if( m[i] == '"' && quote == false && backtick == false && slash == false ){
			double_quote = !double_quote
			bool_next_char = true
		}

		if( m[i] == "'" && double_quote == false && backtick == false && slash == false ){
			quote = !quote
			bool_next_char = true
		}

		if( m[i] == "`" && quote == false && double_quote == false && slash == false ){
			backtick = !backtick
			bool_next_char = true
		}

		if( ( m[i] == "/" ) && (quote == false && double_quote == false && backtick == false) ){
			
			if( !( m[i-1] == "/" || m[i+1] == "/" ) /* regular comment */
            && !( m[i-1] == "*" || m[i+1] == "*" ) /* block comment */
            && !( m[i-1] == "\\" ) /* escape character */
            && isNaN( parseInt( m[i+1] ) ) /* divide by number */ 
			)
			{
				slash = !slash
				bool_next_char = true
			}

		}

		if( [ backtick,quote,double_quote,slash ].every( x=>x==false ) ){

			if( m[i-1] != "$" && m[i] == "{" ){ /* variable in backtick string scope */
				curly_bracket = true
				w.push({ level, array: [] })
				w.at(-1).array.push( `<span style="color:red">${m[i]}</span>` + ` /*level ${level} =>*/ `)
				level++
			}
			else if( m[i] == "}" ){
				curly_bracket = false
				global["end_curly_bracket"] = true
				level--
				w.at(-1).array.push( `<span style="color:red">${m[i]}</span>` + ` /* <= level ${level}*/ ` )
			}
	
		}

		if( global["end_curly_bracket"] ){

		}else{
			w.at(-1).array.push( e(m[i]) )
		}
		
		/*if( quote == false && double_quote == false && backtick == false && slash == false && !bool_next_char ){
			w.at(-1).array.push( e(m[i]) )
		}
		else{
			w.at(-1).array.push( `<span style="color:red">${m[i]}</span>` )
			bool_next_char = false
		}*/

	}

	return w

}
