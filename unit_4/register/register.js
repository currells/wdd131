const gradeTemplate = (`
    <select>
      <option selected value="" disabled selected></option>
      <option value="1">1st</option>
      <option value="2">2nd</option>
      <option value="3">3rd</option>
      <option value="4">4th</option>
      <option value="5">5th</option>
      <option value="6">6th</option>
      <option value="7">7th</option>
      <option value="8">8th</option>
      <option value="9">9th</option>
      <option value="10">10th</option>
      <option value="11">11th</option>
      <option value="12">12th</option>
    </select>    
`);

const participantTemplate = (count) => (`
    <section class="participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname-${count}">First Name<span>*</span></label>
        <input id="fname-${count}" type="text" name="fname-${count}" value="" required />
      </div>
      <div class="item activities">
        <label for="activity-${count}">Activity #<span>*</span></label>
        <input id="activity-${count}" type="text" name="activity-${count}" />
      </div>
      <div class="item">
        <label for="fee-${count}">Fee ($)<span>*</span></label>
        <input id="fee-${count}" type="number" name="fee-${count}" />
      </div>
      <div class="item">
        <label for="date-${count}">Desired Date <span>*</span></label>
        <input id="date-${count}" type="date" name="date-${count}" />
      </div>
      <div class="item">
        <p>Grade</p>
        ${gradeTemplate}
      </div>
    </section>
`);

const successTemplate = ({
    adultName,
    totalFees,
    numberOfParticipants,
}) => (`
    <p>
      Thank you ${adultName} for registering.
      You have registered ${numberOfParticipants} 
      ${numberOfParticipants === 1 ? 'participant' : 'participants'} 
      and owe $${totalFees} in Fees.
    </p>
`);

const addButton = document.getElementById('add');
const form = document.querySelector('form');

let count = 0;

/**
 * adds fees -- taken from the assignment instructions
 * https://wdd131.netlify.app/prove/register-form-1/
 * @returns {number} integer
 */
function totalFees() {
    // the selector below lets us grab any element that has an id that begins with "fee"
    let feeElements = document.querySelectorAll("[id^=fee]");
    console.log(feeElements);
    // querySelectorAll returns a NodeList. It's like an Array, but not exactly the same.
    // The line below is an easy way to convert something that is list-like to an actual Array so we can use all of the helpful Array methods...like reduce
    // The "..." is called the spread operator. It "spreads" apart the list, then the [] we wrapped it in inserts those list items into a new Array.
    feeElements = [...feeElements];
    // sum up all of the fees. Something like Array.reduce() could be very helpful here :) Or you could use a Array.forEach() as well.
    // Remember that the text that was entered into the input element will be found in the .value of the element.

    // once you have your total make sure to return it!
    return feeElements.reduce(
        (accumulator, currentValue) =>
            accumulator + parseInt(currentValue.value), 0);
}

/**
 * adds a participant to the form
 */
const addParticipant = () => {
    addButton.insertAdjacentHTML(
        'beforebegin', participantTemplate(++count));
};

/**
 * "Add Participant" click handler
 */
const handleAddClick = () => addParticipant();

/**
 * "Submit" handler
 * @param {object} e event
 */
const handleFormSubmit = (e) => {
    e.preventDefault();

    const summary = document.getElementById('summary');

    totalFees();

    summary.innerHTML = successTemplate({
        adultName: form['adult_name'].value,
        numberOfParticipants: count,
        totalFees: totalFees(),
    });

    form.style.display = 'none';
};

addButton.addEventListener('click', handleAddClick);
form.addEventListener('submit', handleFormSubmit);

window.onload = addParticipant();
