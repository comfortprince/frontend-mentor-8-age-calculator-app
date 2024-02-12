const dateForm = document.querySelector('#date-form')
const yearsSpan = document.querySelector('#years')
const monthsSpan = document.querySelector('#months')
const daysSpan = document.querySelector('#days')

dateForm.addEventListener('submit', event => {
    event.preventDefault()

    // Read Birth Date
    const form = new FormData(event.target)  
    const day = parseInt( form.get('day') )
    const month = parseInt( form.get('month') )
    const year = parseInt( form.get('year') )

    // Validate Date
    try {
        validateDate(day, month, year)
    } catch (error) {
        switch (error.type) {
            case 'day':
                console.log(error.message);
                break;
            case 'month':
                console.log(error.message);
                break;
            case 'year':
                console.log(error.message);
                break;
            default:
                console.log("Default");
                break;
        }
        return
    }
    
    // Calculate Age
    const birthDate = new Date(year, month - 1, day)
    const age = calculateAge(birthDate)

    // Display Age
    displayAge(age)
})

function displayAge(age) {
    daysSpan.innerHTML = age.days
    monthsSpan.innerHTML = age.months
    yearsSpan.innerHTML = age.years
}

function calculateAge(birthDate) {
    const currentDate = new Date()
    const ageInSecs = (currentDate.getTime() - birthDate.getTime())/1000
    const ageInDays = ageInSecs/(60*60*24)
    
    const numOfYears = Math.floor(ageInDays / 365)
    let remainder = ageInDays % 365
    const numOfMonths = Math.floor(remainder / 30.42)
    const numOfDays = Math.floor(remainder % 30.42)

    return {
        years: numOfYears, 
        months: numOfMonths,
        days: numOfDays 
    }
}

function isLeapYear(year) {
    if ((0 == year % 4) && (0 != year % 100) && (0 == year % 400)) {
        return true
    } else {
        return false        
    }
}

function validateDate(day, month, year) {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    // Validate Year
    if (year > currentYear)
        throw {message: "Must be in the past", type: "year"}
    else if (year < 0) 
        throw {message: "Must be greater than 0", type: "year"}

    // Validate Month
    if ( month > 12 || month < 1 ) 
        throw {message: "Must be in the range of 1 - 12", type: "month"}

    // Validate Day
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            if ( day > 31 || month < 1 )
                throw {message: "Must be in the range of 1 - 31", type: "day"}
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            if ( day > 30 || month < 1 )
                throw {message: "Must be in the range of 1 - 30", type: "day"}
            break;
        case 2:
            if(isLeapYear(year))
                if ( day > 29 || month < 1 )
                    throw {message: "Must be in the range of 1 - 29", type: "day"}
            else
                if ( day > 28 || month < 1 )
                    throw {message: "Must be in the range of 1 - 28", type: "day"}
            break;
        default:
            break;
    }

    const birthDate = new Date(year, month - 1, day)

    if (birthDate > currentDate){
        if(birthDate.getDate() > currentDate.getDate())
            throw {message: "Day cannot be in the future", type: "day"}

        if(birthDate.getMonth() > currentDate.getMonth())
            throw {message: "Month cannot be in the future", type: "month"}
    }
}