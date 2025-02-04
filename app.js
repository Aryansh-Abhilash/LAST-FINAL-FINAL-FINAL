document.getElementById('symptom-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Collect user input
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const symptoms = Array.from(document.querySelectorAll('input[name="symptom"]:checked')).map(input => input.value);
    const resultBox = document.getElementById('result');
    
    // Basic validation
    if (!age || !gender || symptoms.length === 0) {
        resultBox.innerHTML = '<p>Please fill out all fields and select at least one symptom.</p>';
        resultBox.classList.remove('hidden');
        return;
    }
    
    // Initialize variables
    let stage = '';
    let advice = '';
    let severity = 0;

    // Calculate severity based on selected symptoms
    if (symptoms.includes('tremor')) severity++;
    if (symptoms.includes('slowness')) severity++;
    if (symptoms.includes('rigid')) severity++;
    if (symptoms.includes('balance')) severity++;
    if (symptoms.includes('speech')) severity++;
    if (symptoms.includes('writing')) severity++;
    if (symptoms.includes('face')) severity++;
    if (symptoms.includes('sleep')) severity++;

    // Analyze the severity and determine stage
    if (severity <= 2) {
        stage = 'Stage 1 (Mild)';
        advice = 'At this stage, symptoms are mild. It is important to stay active and have regular check-ups with your healthcare provider.';
    } else if (severity <= 4) {
        stage = 'Stage 2 (Moderate)';
        advice = 'Moderate symptoms indicate that you should begin physical therapy and speak with your doctor about possible treatment adjustments.';
    } else if (severity <= 6) {
        stage = 'Stage 3 (Advanced)';
        advice = 'In this stage, symptoms may affect daily activities. Consider adjusting your lifestyle to accommodate changes, and stay in close contact with a specialist.';
    } else {
        stage = 'Stage 4 (Severe)';
        advice = 'Severe symptoms require more intensive medical care and support. Immediate consultation with a neurologist and a care plan are essential.';
    }

    // Additional advice based on age
    if (age <= 30) {
        advice += ' Since you are relatively young, it is crucial to work closely with a healthcare provider to slow the progression.';
    } else if (age <= 50) {
        advice += ' At this age, symptom management with medication and therapy can be very helpful to maintain independence.';
    } else if (age > 50) {
        advice += ' As you age, symptom management and lifestyle adjustments will be increasingly important to preserve quality of life.';
    }

    // Additional advice based on gender (Example: Parkinson's affects men and women differently, adding personalized context)
    if (gender === 'male') {
        advice += ' Studies have shown that men may experience more motor-related symptoms. Men should focus on strength training and mobility exercises.';
    } else if (gender === 'female') {
        advice += ' Women tend to experience more non-motor symptoms such as anxiety or depression. Mental health support is highly recommended.';
    } else {
        advice += ' Regardless of gender, it’s important to stay proactive in symptom management and seek personalized care tailored to your needs.';
    }

    // Display result
    resultBox.innerHTML = `
        <h2>Assessment Result</h2>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Gender:</strong> ${gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
        <p><strong>Symptoms Selected:</strong> ${symptoms.join(', ')}</p>
        <h3>Estimated Parkinson's Stage: ${stage}</h3>
        <p><strong>Recommended Actions:</strong> ${advice}</p>
    `;
    resultBox.classList.remove('hidden');
});
