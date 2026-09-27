const express = require('express');
const db = require('../db/database');
const router = express.Router();
function getAll() { return db.prepare('SELECT id, name, address, city, state, email, phone FROM suppliers ORDER BY id').all(); }
router.get('/api/suppliers', (req,res)=>res.json(getAll()));
router.get('/api/suppliers/:id', (req,res)=>{
  const supplier=db.prepare('SELECT id,name,address,city,state,email,phone FROM suppliers WHERE id=?').get(req.params.id);
  if(!supplier) return res.status(404).json({error:'Supplier not found'}); res.json(supplier);
});
router.post('/api/suppliers',(req,res)=>{
  const {name,address,city,state,email,phone}=req.body;
  if(![name,address,city,state,email,phone].every(Boolean)) return res.status(400).json({error:'All supplier fields are required.'});
  const result=db.prepare('INSERT INTO suppliers (name,address,city,state,email,phone,updated_at) VALUES (?,?,?,?,?,?,CURRENT_TIMESTAMP)').run(name.trim(),address.trim(),city.trim(),state.trim(),email.trim(),phone.trim());
  res.status(201).json(db.prepare('SELECT id,name,address,city,state,email,phone FROM suppliers WHERE id=?').get(result.lastInsertRowid));
});
router.put('/api/suppliers/:id',(req,res)=>{
  const {name,address,city,state,email,phone}=req.body;
  if(![name,address,city,state,email,phone].every(Boolean)) return res.status(400).json({error:'All supplier fields are required.'});
  const result=db.prepare('UPDATE suppliers SET name=?,address=?,city=?,state=?,email=?,phone=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').run(name.trim(),address.trim(),city.trim(),state.trim(),email.trim(),phone.trim(),req.params.id);
  if(!result.changes) return res.status(404).json({error:'Supplier not found'});
  res.json(db.prepare('SELECT id,name,address,city,state,email,phone FROM suppliers WHERE id=?').get(req.params.id));
});
router.delete('/api/suppliers/:id',(req,res)=>{
  const result=db.prepare('DELETE FROM suppliers WHERE id=?').run(req.params.id);
  if(!result.changes) return res.status(404).json({error:'Supplier not found'}); res.status(204).send();
});
router.get('/',(req,res)=>res.render('customer',{suppliers:getAll()}));
router.get('/admin',(req,res)=>res.render('admin',{suppliers:getAll(),editing:null}));
router.get('/admin/suppliers/:id/edit',(req,res)=>{
  const editing=db.prepare('SELECT id,name,address,city,state,email,phone FROM suppliers WHERE id=?').get(req.params.id);
  if(!editing) return res.status(404).send('Supplier not found');
  res.render('admin',{suppliers:getAll(),editing});
});
router.post('/admin/suppliers',(req,res)=>{
  const {name,address,city,state,email,phone}=req.body;
  db.prepare('INSERT INTO suppliers (name,address,city,state,email,phone,updated_at) VALUES (?,?,?,?,?,?,CURRENT_TIMESTAMP)').run(name,address,city,state,email,phone); res.redirect('/admin');
});
router.post('/admin/suppliers/:id',(req,res)=>{
  const {name,address,city,state,email,phone}=req.body;
  db.prepare('UPDATE suppliers SET name=?,address=?,city=?,state=?,email=?,phone=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').run(name,address,city,state,email,phone,req.params.id); res.redirect('/admin');
});
module.exports=router;
