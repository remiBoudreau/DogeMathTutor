import requests
import bs4
import re
import json
import uuid

topics = []
questions = []
grades = []
ids = []

# Direct From Site
response = requests.get('https://www.prodigygame.com/main-en/blog/math-word-questions/')
soup = bs4.BeautifulSoup(response.text, "lxml")

# Local Copy of Site
#with open("index.html") as fp:
#    soup = bs4.BeautifulSoup(fp, "lxml")

# Remove all <span> prior to first one pertaining to problems
soupString = re.findall('<p style="text-align:center"><img alt="Math Word Problems - Three students stand at a white completing math word problems focused on addition, under a teacher\'s watchful eye. " class="aligncenter size-full wp-image-945" height="400" src="./120 Math Word Problems To Challenge Students Grades 1 to 8 _ Prodigy Education_files/2017-01-09-Math-Whiteboard-condensed-5.jpg" width="600"/></p>[\s\S]*', str(soup))[0]
# Replace all <i> tags
soupString = soupString.replace("</span><i><span style=\"font-weight:400\">", "").replace("<i>", "").replace("</i>","")
# Replace all <span> open/close tags not proceeding a '.' or '?'
spanArr = re.findall('<span.*?(?:\?|\.)</span>', soupString)[:120]

gradeLists = []
for i in range(0, len(spanArr)):


    # add grades to grades array
    newGradesCheck = re.findall('</b>.*[0-9].*grade', spanArr[i])
    if (len(newGradesCheck) != 0):
        # Get all digits in string in JSON
        grade = newGradesCheck[0]
        gradeLists.append(list(map(int, re.findall(r'\d+', grade))))
    grades.append(json.dumps(gradeLists[len(gradeLists) - 1]))


    # # isolate questions from all other entities
    spanArr[i] = re.sub('<span.*<b>.*<span', '<span', spanArr[i])
    question = spanArr[i].replace("<span style=\"font-weight:400\">", "").replace("</span>", "")
    questions.append(question)




# Format all child <b> tags; creates duplicates otherwise for pattern <b><b>
soupString = str(soup).replace("<b><b>", "<b>")

# Recreate soup object
soup = bs4.BeautifulSoup(soupString, "lxml")

for b in soup.find_all('b'):
    # Get all topics (<b> strings)
    topic = re.findall('[0-9].*?:', str(b))
    if (len(topic) > 0):
        # Remove all chars before first letter
        for i,x in enumerate(topic[0]):
            if x.isalpha():
                pos = i
                topics.append(topic[0][i:].replace(":", ""))
                break

# Create uuid list
for topic in topics:
    ids.append(str(uuid.uuid4()))

# Create csv
import pandas as pd 
pd.DataFrame({'topic':topics,'question':questions,'grades':grades, 'id':ids}).to_csv('prodigyData.csv', index=False)

# Create json for json2graphql
# prodigyJson = json.dumps({"problems":[{'topics':topic, 'questions':question, 'grades':grade} for topic, question, grade in zip(topics, questions, grades)]})
# with open('prodigyData.json', 'w') as fp:
#     json.dump(prodigyJson, fp)
