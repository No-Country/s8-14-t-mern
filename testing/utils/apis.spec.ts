import { test, expect, type Page } from "@playwright/test";

const users = 'users'
const products = 'products'

test('Agregar user en api local data-server', async ({ request }) => {
    const newIssue = await request.post(`http://localhost:7000/${users}`, {
      data: {
        name: 'jhon rambo',
      }
    });
    expect(newIssue.ok()).toBeTruthy();
  
    const issues = await request.get(`http://localhost:7000/${users}`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
      name: 'jhon rambo'
    }));
  });