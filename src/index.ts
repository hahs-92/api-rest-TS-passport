import app from './app'
//DB
import './database'

app.listen(app.get('port'), () => {
    console.log(`Server on port ${ app.get('port')}`)
})
