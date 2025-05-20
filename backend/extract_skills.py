import fitz  # PyMuPDF

skills_list = [
    
    "Python", "Java", "JavaScript", "TypeScript", "C#", "C++", "Ruby", "Go", "PHP", "Swift",

   
    "HTML", "CSS", "React", "Angular", "Vue", "Svelte", "Bootstrap", "Tailwind CSS",

    
    "Node.js", "Express", "Django", "Flask", "Spring", "Laravel", "Ruby on Rails", "ASP.NET",

    "MVC", "REST", "GraphQL", "Microservices", "Serverless",

    "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis", "Cassandra",

    "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD",

    "Git", "Linux", "Jenkins", "Webpack", "Babel",

    # Data Science & AI (optional)
    "Machine Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy"
]

def extract_text_from_pdf(file_bytes):
    doc = fitz.open(stream=file_bytes, filetype="pdf")  # Open PDF from bytes
    text = ""
    for page in doc:
        text += page.get_text()
    return text.lower()

def extract_skills(text):
    found = []
    for skill in skills_list:
        if skill.lower() in text:
            found.append(skill)
    return found
