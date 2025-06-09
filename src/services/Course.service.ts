import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, Exam, Question, Answer } from 'src/models/Course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8000/api/courses';
  private examUrl = 'http://localhost:8000/api/exams';
  private questionUrl = 'http://localhost:8000/api/questions';
  private answerUrl = 'http://localhost:8000/api/answers';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, course);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  acceptCourse(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/accept`, {});
  }

  rejectCourse(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/reject`, {});
  }

  getCoursesByDiscipline(disciplineId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/discipline/${disciplineId}`);
  }

  getCoursesBySpeciality(specialityId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/speciality/${specialityId}`);
  }

  // Exam methods
  getAllExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.examUrl);
  }

  getExamById(id: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.examUrl}/${id}`);
  }

  addExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(this.examUrl, exam);
  }

  updateExam(id: number, exam: Exam): Observable<Exam> {
    return this.http.put<Exam>(`${this.examUrl}/${id}`, exam);
  }

  // Question methods
  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionUrl, question);
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.questionUrl}/${id}`, question);
  }

  // Answer methods
  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.answerUrl, answer);
  }

  updateAnswer(id: number, answer: Answer): Observable<Answer> {
    return this.http.put<Answer>(`${this.answerUrl}/${id}`, answer);
  }
}