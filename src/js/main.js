let data = get_correct_data(randomUserMock, additionalUsers)
// 2
data_validation(data)

//console.log(data)

// 3
let my_client = filter(data, {'gender':'Female'})
//let my_client = data.filter(element => element.gender == 'Female')
//console.log(my_client)

// 4

let s_data = data_sort(data, ['full_name'])
//let s_data = data.sort((a, b) => a['age'] > b['age'] ? -1 : 1)
//let s_data = data.sort((a, b) => a['full_name'] > b['full_name'] ? -1 : 1)
console.log(s_data)

let el = search_object(data, {'age': 65})
//let el = data.find(el => el['age'] > 65)
//console.log(el)

// TODO 6
let find_6 = data.reduce((total, current) => total + (current['age'] > 65 ? 1 : 0), 0) / data.length * 100
//console.log(find_6)

