function loop_string_scope(m){

	let backtick = false
	let quote = false
	let double_quote = false
	let slash = false // regex
	
	let curly_bracket = false

	let w = [{ level:0, array: [] }]
	let level = 0
	let count_line = 1

	for( let i=0;i<m.length;i++ ){

		if( m[i] == "\n" ) count_line++

		if( m[i] == '"' && quote == false && backtick == false && slash == false )
		double_quote = !double_quote

		if( m[i] == "'" && double_quote == false && backtick == false && slash == false )
		quote = !quote

		if( m[i] == "`" && quote == false && double_quote == false && slash == false)
		backtick = !backtick

		if( ( m[i] == "/" ) && (quote == false && double_quote == false && backtick == false) ){

			if( !( m[i-1] == "/" || m[i+1] == "/" ) // regular comment
            && !( m[i-1] == "*" || m[i+1] == "*" ) /* block comment */
            && !( m[i-1] == "\\" ) /* escape character */
            && isNaN( parseInt( m[i+1] ) /* divide by number */ )
			)
			{
				slash = !slash
			}

		}

		if( quote == false && double_quote == false && backtick == false && slash == false ){
			if( [ '"',"'","`", "/" ].includes(m[i]) )
			w.at(-1).array.push( `<span style="color:red">${m[i]}</span>` )
			else
			w.at(-1).array.push( e(m[i]) )
		}
		else
		w.at(-1).array.push( `<span style="color:red">${m[i]}</span>` )

	}

	return w

}
